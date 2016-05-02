'use strict';

/*********************
Assumptions
-all tasks will reqire a unix date/deadline of 5pm on their assigned day or next scheduled interval
-fromBeginning and fromEnd fields will require calculation based on user selection
-there can only be one instances of a scheduled project at a time. The creation of the next instances of that
 scheduled project occurs either at completion of the previous instances or at the deadline of the previous instance
-default task list sent to user includes all overdue tasks and tasks do for that day
-triggered tasks have no due date and will show until project is completed

-Template created :
    - new Template document is created in the Template Collection

Task(s) Added:
    - new TemplateTask document is created in TemplateTask collection
    - a reference to the TemplateTask is added to the Template document

Template Saved :
    -Template document is saved to the Template collection;
    -TemplateTask documents saved to the TemplateTask collection

Project Activated:
    - Function creates new Project document in the Project collections based on selected Template Schema
    - Tasks in new Project document are saved as new Task documents in the Tasks collection


Project Complete:
    - Status of Project is updated to complete
    - If project is a triggered project then nothing else happens
    - If project is a scheduled project then the app calculates the next instances of that project and...
        - Creates a new Project document in the Projects collection based on previously selected Template Schema
        - Tasks in new Project document are saved as new Task documents in the Tasks collection


At Project Deadline If....

// We need to decide how best to handle this
Project Incomplete:
    - Current Idea (temporary):
        - When deadline date hits for project, process runs to confirm if all tasks are completed.
        - If there are incomplete tasks, a copy of the project is embedded in a separate incomplete project collection.
            - This allows the system to continue tracking the incomplete project (and run stats!) while also allowing the next instances
            of a project and subseqent tasks to be instantiated.
        - Once the the incomplete project has been completed, another copy can be embedded in to the project collection.
        - DECISION PENDING: Do we keep a record of the previously incomplete project in the incomplete collection for reporting/tracking purposes,
        or do we delete the instance from the incomplete collection and add another key value to the template model that can track whether projects
        were completed on time?


Slack Actions....

Task Complete:
    - User tells bot task is finshed
    - Server parses user's message for "Completed" syntax and task ID and executes function to update task status to complete
    - Server runs function to see if all tasks in project are complete. If so, project status is updated to complete and all
      associated functions run


User Requests Task
    - User asks bot for their work
    - Server complies response object that includeds....
        - All assigned triggered tasks
        - All scheduled tasks due that day
        - All overdue scheduled tasks

        -----------------------------------------------------------------------------------------
        - USERNAME'S TASKS                                                                      -
        -                                                                                       -
        -  OVER DUE                                                                             -
        -   TASK ID - OVERDUE TASK 1 - TASK 1 ASSIGNMENT - TASK 1 STATUS                        -
        -   TASK ID - OVERDUE TASK 2 - TASK 2 ASSIGNMENT - TASK 2 STATUS                        -
        -   TASK ID - OVERDUE TASK 3 - TASK 3 ASSIGNMENT - TASK 3 STATUS                        -
        -   TASK ID - OVERDUE TASK 4 - TASK 4 ASSIGNMENT - TASK 4 STATUS                        -
        -                                                                                       -
        -  DUE TODAY                                                                            -
        -   TASK ID - DUE TODAY TASK 1 - TASK 1 ASSIGNMENT - TASK 1 STATUS                      -
        -   TASK ID - DUE TODAY TASK 2 - TASK 2 ASSIGNMENT - TASK 2 STATUS                      -
        -   TASK ID - DUE TODAY TASK 3 - TASK 3 ASSIGNMENT - TASK 3 STATUS                      -
        -   TASK ID - DUE TODAY TASK 4 - TASK 4 ASSIGNMENT - TASK 4 STATUS                      -
        -                                                                                       -
        -----------------------------------------------------------------------------------------



User Requests Project Details
    - Users asks bot for project details
        - includes some sort of project id in message body to help the server query the correct project
    - Server parses users message for pertinate details
    - Server queries db for project id &....
    - Server returns a json message to slack that includes
        -----------------------------------------------------------------------------------------
        - PROJECT TITLE                                                                         -
        - PROJECT DESCRIPTION                                           XX OF XX TASKS COMPLETE -
        -                                                                                       -
        -TASK 1 - TASK 1 ASSIGNMENT - TASK 1 STATUS                                             -
        -TASK 2 - TASK 2 ASSIGNMENT - TASK 2 STATUS                                             -
        -TASK 3 - TASK 3 ASSIGNMENT - TASK 3 STATUS                                             -
        -TASK 4 - TASK 4 ASSIGNMENT - TASK 4 STATUS                                             -
        -                                                                                       -
        -----------------------------------------------------------------------------------------

User Marks Task Complete
    - User tells bot they are done with task
        - includes some kind of task id to help the server query the correct task
    - Server updates the task to complete
    - Server checks to see if all project tasks are complete





// Tasks Assigned - Attribute on Task document dictates who the task is assigned to. An employee confirms their list with a slack call.

// Task completed - Through slack, employee updates the complete attribute from false to true once the task is completed.

**********************/

var allowedDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
var allowedFrequencies = ["Triggered", "Scheduled"];
var allowedIntervalTypes = ['Daily', 'Daily Business Days', 'Weekly', 'Bi-Weekly', 'Monthly', 'Semi-Montly', 'Quarterly', 'Annually'];
var allowedMonthlyIntervals = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var allowedAnnuallyIntervals = ["First Day of the Year", "Last Day of the Year", "Any Day of the year", "In a Particular Month", "In a Particular Quarter", "# of Days From Start", "# of Days Before end"];
var allowedWeeklyIntervals = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Any'];
var allowedSemiMonthlyIntervals = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th", "11th", "12th", "13th", "14th", "15th"];
var allowedQuarterlyIntervals = ["First Day of the Quarter", "Last Day of the Quarter", "# Days from Start", "# Days from End", "Any"];

//This is the model for project template creation.
var Template = mongoose.model('Template', new mongoose.Schema({
  //The name will be the same for all projects generated from the template
  name: { type: String },
  //Description is the  unique visual identifies of a project on the front end
  description: { type: String },
  tasks: [{ type: String, ref: 'TemplateTask' }],
  setup: {
    created: { type: Date, default: new Date() },
    type: { type: String, enum: ['Single', 'Triggered', 'Scheduled'] },
    //Pick one of these two frequency options
    // frequency:  {
    //     byDate: {type: Boolean},
    //     byInterval: {type: Boolean}
    // },
    frequency: { type: String, enum: ['By Date', 'By Interval'] },
    //Due date will require function based on user selection. Will be stand in for next instance or selected day.
    dueDate: { type: Date },
    interval: {
      type: { type: String, enum: allowedIntervalTypes },
      weeklyInterval: { type: String, enum: allowedWeeklyIntervals },
      monthlyInterval: {
        selection: { type: String, enum: allowedMonthlyIntervals },
        //fromBeginning and fromEnd will require calculation based on user input but should be available in the template
        fromBeginning: {},
        fromEnd: {}
      },
      annualInterval: {
        selection: { type: String, enum: allowedAnnuallyIntervals },
        fromBeginning: {},
        fromEnd: {}
      },
      quarterlyInterval: {
        selection: { type: String, enum: allowedQuarterlyIntervals },
        fromBeginning: {},
        fromEnd: {}
      },
      semiMonthlyInterval: {
        selection: { type: String, enum: allowedSemiMonthlyIntervals },
        fromBeginning: {},
        fromEnd: {}
      }
    },
    intervalType: { type: String, enum: allowedIntervalTypes }
  }

}));

// This is the model for the Project creation
var Project = mongoose.model('Project', new mongoose.Schema({
  //The name will be the same for all projects generated from the template
  name: { type: String },
  //Description is the  unique visual identifies of a project on the front end
  description: { type: String },
  status: { type: String, enum: ['Complete', 'Incomplete'], default: 'Incomplete' },
  tasks: [{ type: String, ref: 'TemplateTask' }],
  timetable: {
    frequency: { type: String, enum: ['Single', 'Triggered', 'Scheduled'] }
  },
  setup: {
    created: { type: Date, default: new Date() },
    type: { type: String, enum: ['Single', 'Triggered', 'Scheduled'] },
    //Pick one of these
    frequency: {
      byDate: { type: Boolean },
      byInterval: { type: Boolean }
    },
    frequency: { type: String, enum: ['By Date', 'By Interval'] },
    //Due date will require function based on user selection. Will be stand in for next instance or selected day.
    dueDate: { type: Date },
    interval: {
      type: { type: String, enum: allowedIntervalTypes },
      weeklyInterval: { type: String, enum: allowedWeeklyIntervals },
      monthlyInterval: {
        selection: { type: String, enum: allowedMonthlyIntervals },
        //fromBeginning and fromEnd will require calculation based on user input but should be available in the template
        fromBeginning: {},
        fromEnd: {}
      },
      annualInterval: {
        selection: { type: String, enum: allowedAnnuallyIntervals },
        fromBeginning: {},
        fromEnd: {}
      },
      quarterlyInterval: {
        selection: { type: String, enum: allowedQuarterlyIntervals },
        fromBeginning: {},
        fromEnd: {}
      },
      semiMonthlyInterval: {
        selection: { type: String, enum: allowedSemiMonthlyIntervals },
        fromBeginning: {},
        fromEnd: {}
      }
    },
    intervalType: { type: String, enum: allowedIntervalTypes }
  }
}));

var TemplateTask = mongoose.model('TemplateTask', new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  associatedProject: { type: String, ref: 'Project' },
  date: {
    created: { type: Date, default: new Date() },
    deadline: { type: Date }
  },
  assigment: {
    departments: { type: String, ref: 'Department' },
    positions: { type: String, ref: 'Position' },
    employees: { type: String, ref: 'Employee' }
  }
}));

//Model of tasks tied to active projects. References department, position, and individual
var ProjectTask = mongoose.model('Task', new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  status: { type: String, enum: ['Complete', 'Incomplete'], default: 'Incomplete' },
  associatedProject: { type: String, ref: 'Project' },
  date: {
    created: { type: Date, default: new Date() },
    deadline: {}
  },
  assigment: {
    departments: { type: String, ref: 'Department' },
    positions: { type: String, ref: 'Position' },
    employees: { type: String, ref: 'Employee' }
  }
}));

//Model of the company's information. References departments, positions, employees.
var Company = mongoose.model('Company', new mongoose.Schema({
  name: { type: String, required: true },
  //Availability indicates days and hours of operations for the company. This will affect the timeline of deadlines, etc.
  availability: {
    days: [{ type: String, enum: allowedDays, required: true }],
    hourOpen: { type: Number },
    hourClosed: { type: Number }
  },
  //The below three reference to the specific departments, positions, and employees within the company.
  departments: [{ type: String, ref: 'Department' }],
  positions: [{ type: String, ref: 'Position' }],
  employees: [{ type: String, ref: 'Employee' }],
  //Company-related slack information for tying the slack bot commands to the company's slack domain.
  slack: {
    team_id: { type: String },
    team_domain: { type: String },
    channels: [{
      channel_id: { type: String },
      channel_name: { type: String }
    }]
  }
}));

// Position/role employees have at the company.
var Position = mongoose.model('Position', new mongoose.Schema({
  name: { type: String, required: true },
  employees: [{ type: String, ref: 'Employee' }]
}));

//Departments within the company.
var Department = mongoose.model('Department', new mongoose.Schema({
  name: { type: String, required: true },
  employees: [{ type: String, ref: 'Employee' }]
}));

//Users are all employees of the company. NOTE: Not all users will actually have login access to the UI.
var Employee = mongoose.model('Employee', new mongoose.Schema({
  //Employee name information
  identification: {
    name: {
      firstName: { type: String },
      lastName: { type: String },
      fullName: { type: String }
    },
    //Employee's username for Authentication, reports, etc in the UI. Only for employee's who would be starting projects.
    userName: { type: String },
    //Slack handle to tie to the slack bot commands.
    slackHandle: { type: String },
    email: { type: String },
    googleId: {}
  },
  //This determines whether an employee has access. True = access to UI.
  permissions: {
    admin: { type: Boolean, default: false }
  },
  positions: [{ type: String, ref: 'Position' }],
  departments: [{ type: String, ref: 'Department' }]
}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZlcl9hc3NldHMvbW9kZWxzL21vZGVsQnJhaW5zdHJvbXMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW9IQSxJQUFJLFdBQVcsR0FBRyxDQUFDLFFBQVEsRUFBQyxRQUFRLEVBQUMsU0FBUyxFQUFDLFdBQVcsRUFBQyxVQUFVLEVBQUMsUUFBUSxFQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQzNGLElBQUksa0JBQWtCLEdBQUcsQ0FBQyxXQUFXLEVBQUUsV0FBVyxDQUFDLENBQUM7QUFDcEQsSUFBSSxvQkFBb0IsR0FBRyxDQUFDLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxRQUFRLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxhQUFhLEVBQUUsV0FBVyxFQUFFLFVBQVUsQ0FBQyxDQUFDO0FBQ3RJLElBQUksdUJBQXVCLEdBQUcsQ0FBQyxTQUFTLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0FBQ3pKLElBQUksd0JBQXdCLEdBQUcsQ0FBQyx1QkFBdUIsRUFBRSxzQkFBc0IsRUFBRSxxQkFBcUIsRUFBRSx1QkFBdUIsRUFBRSx5QkFBeUIsRUFBRSxzQkFBc0IsRUFBRSxzQkFBc0IsQ0FBQyxDQUFDO0FBQzVNLElBQUksc0JBQXNCLEdBQUcsQ0FBQyxRQUFRLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFDbkgsSUFBSSwyQkFBMkIsR0FBRyxDQUFDLEtBQUssRUFBQyxL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L21vZGVsQnJhaW5zdHJvbXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqXG5Bc3N1bXB0aW9uc1xuLWFsbCB0YXNrcyB3aWxsIHJlcWlyZSBhIHVuaXggZGF0ZS9kZWFkbGluZSBvZiA1cG0gb24gdGhlaXIgYXNzaWduZWQgZGF5IG9yIG5leHQgc2NoZWR1bGVkIGludGVydmFsXG4tZnJvbUJlZ2lubmluZyBhbmQgZnJvbUVuZCBmaWVsZHMgd2lsbCByZXF1aXJlIGNhbGN1bGF0aW9uIGJhc2VkIG9uIHVzZXIgc2VsZWN0aW9uXG4tdGhlcmUgY2FuIG9ubHkgYmUgb25lIGluc3RhbmNlcyBvZiBhIHNjaGVkdWxlZCBwcm9qZWN0IGF0IGEgdGltZS4gVGhlIGNyZWF0aW9uIG9mIHRoZSBuZXh0IGluc3RhbmNlcyBvZiB0aGF0XG4gc2NoZWR1bGVkIHByb2plY3Qgb2NjdXJzIGVpdGhlciBhdCBjb21wbGV0aW9uIG9mIHRoZSBwcmV2aW91cyBpbnN0YW5jZXMgb3IgYXQgdGhlIGRlYWRsaW5lIG9mIHRoZSBwcmV2aW91cyBpbnN0YW5jZVxuLWRlZmF1bHQgdGFzayBsaXN0IHNlbnQgdG8gdXNlciBpbmNsdWRlcyBhbGwgb3ZlcmR1ZSB0YXNrcyBhbmQgdGFza3MgZG8gZm9yIHRoYXQgZGF5XG4tdHJpZ2dlcmVkIHRhc2tzIGhhdmUgbm8gZHVlIGRhdGUgYW5kIHdpbGwgc2hvdyB1bnRpbCBwcm9qZWN0IGlzIGNvbXBsZXRlZFxuXG4tVGVtcGxhdGUgY3JlYXRlZCA6XG4gICAgLSBuZXcgVGVtcGxhdGUgZG9jdW1lbnQgaXMgY3JlYXRlZCBpbiB0aGUgVGVtcGxhdGUgQ29sbGVjdGlvblxuXG5UYXNrKHMpIEFkZGVkOlxuICAgIC0gbmV3IFRlbXBsYXRlVGFzayBkb2N1bWVudCBpcyBjcmVhdGVkIGluIFRlbXBsYXRlVGFzayBjb2xsZWN0aW9uXG4gICAgLSBhIHJlZmVyZW5jZSB0byB0aGUgVGVtcGxhdGVUYXNrIGlzIGFkZGVkIHRvIHRoZSBUZW1wbGF0ZSBkb2N1bWVudFxuXG5UZW1wbGF0ZSBTYXZlZCA6XG4gICAgLVRlbXBsYXRlIGRvY3VtZW50IGlzIHNhdmVkIHRvIHRoZSBUZW1wbGF0ZSBjb2xsZWN0aW9uO1xuICAgIC1UZW1wbGF0ZVRhc2sgZG9jdW1lbnRzIHNhdmVkIHRvIHRoZSBUZW1wbGF0ZVRhc2sgY29sbGVjdGlvblxuXG5Qcm9qZWN0IEFjdGl2YXRlZDpcbiAgICAtIEZ1bmN0aW9uIGNyZWF0ZXMgbmV3IFByb2plY3QgZG9jdW1lbnQgaW4gdGhlIFByb2plY3QgY29sbGVjdGlvbnMgYmFzZWQgb24gc2VsZWN0ZWQgVGVtcGxhdGUgU2NoZW1hXG4gICAgLSBUYXNrcyBpbiBuZXcgUHJvamVjdCBkb2N1bWVudCBhcmUgc2F2ZWQgYXMgbmV3IFRhc2sgZG9jdW1lbnRzIGluIHRoZSBUYXNrcyBjb2xsZWN0aW9uXG5cblxuUHJvamVjdCBDb21wbGV0ZTpcbiAgICAtIFN0YXR1cyBvZiBQcm9qZWN0IGlzIHVwZGF0ZWQgdG8gY29tcGxldGVcbiAgICAtIElmIHByb2plY3QgaXMgYSB0cmlnZ2VyZWQgcHJvamVjdCB0aGVuIG5vdGhpbmcgZWxzZSBoYXBwZW5zXG4gICAgLSBJZiBwcm9qZWN0IGlzIGEgc2NoZWR1bGVkIHByb2plY3QgdGhlbiB0aGUgYXBwIGNhbGN1bGF0ZXMgdGhlIG5leHQgaW5zdGFuY2VzIG9mIHRoYXQgcHJvamVjdCBhbmQuLi5cbiAgICAgICAgLSBDcmVhdGVzIGEgbmV3IFByb2plY3QgZG9jdW1lbnQgaW4gdGhlIFByb2plY3RzIGNvbGxlY3Rpb24gYmFzZWQgb24gcHJldmlvdXNseSBzZWxlY3RlZCBUZW1wbGF0ZSBTY2hlbWFcbiAgICAgICAgLSBUYXNrcyBpbiBuZXcgUHJvamVjdCBkb2N1bWVudCBhcmUgc2F2ZWQgYXMgbmV3IFRhc2sgZG9jdW1lbnRzIGluIHRoZSBUYXNrcyBjb2xsZWN0aW9uXG5cblxuQXQgUHJvamVjdCBEZWFkbGluZSBJZi4uLi5cblxuLy8gV2UgbmVlZCB0byBkZWNpZGUgaG93IGJlc3QgdG8gaGFuZGxlIHRoaXNcblByb2plY3QgSW5jb21wbGV0ZTpcbiAgICAtIEN1cnJlbnQgSWRlYSAodGVtcG9yYXJ5KTpcbiAgICAgICAgLSBXaGVuIGRlYWRsaW5lIGRhdGUgaGl0cyBmb3IgcHJvamVjdCwgcHJvY2VzcyBydW5zIHRvIGNvbmZpcm0gaWYgYWxsIHRhc2tzIGFyZSBjb21wbGV0ZWQuXG4gICAgICAgIC0gSWYgdGhlcmUgYXJlIGluY29tcGxldGUgdGFza3MsIGEgY29weSBvZiB0aGUgcHJvamVjdCBpcyBlbWJlZGRlZCBpbiBhIHNlcGFyYXRlIGluY29tcGxldGUgcHJvamVjdCBjb2xsZWN0aW9uLlxuICAgICAgICAgICAgLSBUaGlzIGFsbG93cyB0aGUgc3lzdGVtIHRvIGNvbnRpbnVlIHRyYWNraW5nIHRoZSBpbmNvbXBsZXRlIHByb2plY3QgKGFuZCBydW4gc3RhdHMhKSB3aGlsZSBhbHNvIGFsbG93aW5nIHRoZSBuZXh0IGluc3RhbmNlc1xuICAgICAgICAgICAgb2YgYSBwcm9qZWN0IGFuZCBzdWJzZXFlbnQgdGFza3MgdG8gYmUgaW5zdGFudGlhdGVkLlxuICAgICAgICAtIE9uY2UgdGhlIHRoZSBpbmNvbXBsZXRlIHByb2plY3QgaGFzIGJlZW4gY29tcGxldGVkLCBhbm90aGVyIGNvcHkgY2FuIGJlIGVtYmVkZGVkIGluIHRvIHRoZSBwcm9qZWN0IGNvbGxlY3Rpb24uXG4gICAgICAgIC0gREVDSVNJT04gUEVORElORzogRG8gd2Uga2VlcCBhIHJlY29yZCBvZiB0aGUgcHJldmlvdXNseSBpbmNvbXBsZXRlIHByb2plY3QgaW4gdGhlIGluY29tcGxldGUgY29sbGVjdGlvbiBmb3IgcmVwb3J0aW5nL3RyYWNraW5nIHB1cnBvc2VzLFxuICAgICAgICBvciBkbyB3ZSBkZWxldGUgdGhlIGluc3RhbmNlIGZyb20gdGhlIGluY29tcGxldGUgY29sbGVjdGlvbiBhbmQgYWRkIGFub3RoZXIga2V5IHZhbHVlIHRvIHRoZSB0ZW1wbGF0ZSBtb2RlbCB0aGF0IGNhbiB0cmFjayB3aGV0aGVyIHByb2plY3RzXG4gICAgICAgIHdlcmUgY29tcGxldGVkIG9uIHRpbWU/XG5cblxuU2xhY2sgQWN0aW9ucy4uLi5cblxuVGFzayBDb21wbGV0ZTpcbiAgICAtIFVzZXIgdGVsbHMgYm90IHRhc2sgaXMgZmluc2hlZFxuICAgIC0gU2VydmVyIHBhcnNlcyB1c2VyJ3MgbWVzc2FnZSBmb3IgXCJDb21wbGV0ZWRcIiBzeW50YXggYW5kIHRhc2sgSUQgYW5kIGV4ZWN1dGVzIGZ1bmN0aW9uIHRvIHVwZGF0ZSB0YXNrIHN0YXR1cyB0byBjb21wbGV0ZVxuICAgIC0gU2VydmVyIHJ1bnMgZnVuY3Rpb24gdG8gc2VlIGlmIGFsbCB0YXNrcyBpbiBwcm9qZWN0IGFyZSBjb21wbGV0ZS4gSWYgc28sIHByb2plY3Qgc3RhdHVzIGlzIHVwZGF0ZWQgdG8gY29tcGxldGUgYW5kIGFsbFxuICAgICAgYXNzb2NpYXRlZCBmdW5jdGlvbnMgcnVuXG5cblxuVXNlciBSZXF1ZXN0cyBUYXNrXG4gICAgLSBVc2VyIGFza3MgYm90IGZvciB0aGVpciB3b3JrXG4gICAgLSBTZXJ2ZXIgY29tcGxpZXMgcmVzcG9uc2Ugb2JqZWN0IHRoYXQgaW5jbHVkZWRzLi4uLlxuICAgICAgICAtIEFsbCBhc3NpZ25lZCB0cmlnZ2VyZWQgdGFza3NcbiAgICAgICAgLSBBbGwgc2NoZWR1bGVkIHRhc2tzIGR1ZSB0aGF0IGRheVxuICAgICAgICAtIEFsbCBvdmVyZHVlIHNjaGVkdWxlZCB0YXNrc1xuXG4gICAgICAgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICAgIC0gVVNFUk5BTUUnUyBUQVNLUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAtXG4gICAgICAgIC0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAtXG4gICAgICAgIC0gIE9WRVIgRFVFICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAtXG4gICAgICAgIC0gICBUQVNLIElEIC0gT1ZFUkRVRSBUQVNLIDEgLSBUQVNLIDEgQVNTSUdOTUVOVCAtIFRBU0sgMSBTVEFUVVMgICAgICAgICAgICAgICAgICAgICAgICAtXG4gICAgICAgIC0gICBUQVNLIElEIC0gT1ZFUkRVRSBUQVNLIDIgLSBUQVNLIDIgQVNTSUdOTUVOVCAtIFRBU0sgMiBTVEFUVVMgICAgICAgICAgICAgICAgICAgICAgICAtXG4gICAgICAgIC0gICBUQVNLIElEIC0gT1ZFUkRVRSBUQVNLIDMgLSBUQVNLIDMgQVNTSUdOTUVOVCAtIFRBU0sgMyBTVEFUVVMgICAgICAgICAgICAgICAgICAgICAgICAtXG4gICAgICAgIC0gICBUQVNLIElEIC0gT1ZFUkRVRSBUQVNLIDQgLSBUQVNLIDQgQVNTSUdOTUVOVCAtIFRBU0sgNCBTVEFUVVMgICAgICAgICAgICAgICAgICAgICAgICAtXG4gICAgICAgIC0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAtXG4gICAgICAgIC0gIERVRSBUT0RBWSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAtXG4gICAgICAgIC0gICBUQVNLIElEIC0gRFVFIFRPREFZIFRBU0sgMSAtIFRBU0sgMSBBU1NJR05NRU5UIC0gVEFTSyAxIFNUQVRVUyAgICAgICAgICAgICAgICAgICAgICAtXG4gICAgICAgIC0gICBUQVNLIElEIC0gRFVFIFRPREFZIFRBU0sgMiAtIFRBU0sgMiBBU1NJR05NRU5UIC0gVEFTSyAyIFNUQVRVUyAgICAgICAgICAgICAgICAgICAgICAtXG4gICAgICAgIC0gICBUQVNLIElEIC0gRFVFIFRPREFZIFRBU0sgMyAtIFRBU0sgMyBBU1NJR05NRU5UIC0gVEFTSyAzIFNUQVRVUyAgICAgICAgICAgICAgICAgICAgICAtXG4gICAgICAgIC0gICBUQVNLIElEIC0gRFVFIFRPREFZIFRBU0sgNCAtIFRBU0sgNCBBU1NJR05NRU5UIC0gVEFTSyA0IFNUQVRVUyAgICAgICAgICAgICAgICAgICAgICAtXG4gICAgICAgIC0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAtXG4gICAgICAgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblxuXG5Vc2VyIFJlcXVlc3RzIFByb2plY3QgRGV0YWlsc1xuICAgIC0gVXNlcnMgYXNrcyBib3QgZm9yIHByb2plY3QgZGV0YWlsc1xuICAgICAgICAtIGluY2x1ZGVzIHNvbWUgc29ydCBvZiBwcm9qZWN0IGlkIGluIG1lc3NhZ2UgYm9keSB0byBoZWxwIHRoZSBzZXJ2ZXIgcXVlcnkgdGhlIGNvcnJlY3QgcHJvamVjdFxuICAgIC0gU2VydmVyIHBhcnNlcyB1c2VycyBtZXNzYWdlIGZvciBwZXJ0aW5hdGUgZGV0YWlsc1xuICAgIC0gU2VydmVyIHF1ZXJpZXMgZGIgZm9yIHByb2plY3QgaWQgJi4uLi5cbiAgICAtIFNlcnZlciByZXR1cm5zIGEganNvbiBtZXNzYWdlIHRvIHNsYWNrIHRoYXQgaW5jbHVkZXNcbiAgICAgICAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgICAgLSBQUk9KRUNUIFRJVExFICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC1cbiAgICAgICAgLSBQUk9KRUNUIERFU0NSSVBUSU9OICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFhYIE9GIFhYIFRBU0tTIENPTVBMRVRFIC1cbiAgICAgICAgLSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC1cbiAgICAgICAgLVRBU0sgMSAtIFRBU0sgMSBBU1NJR05NRU5UIC0gVEFTSyAxIFNUQVRVUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC1cbiAgICAgICAgLVRBU0sgMiAtIFRBU0sgMiBBU1NJR05NRU5UIC0gVEFTSyAyIFNUQVRVUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC1cbiAgICAgICAgLVRBU0sgMyAtIFRBU0sgMyBBU1NJR05NRU5UIC0gVEFTSyAzIFNUQVRVUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC1cbiAgICAgICAgLVRBU0sgNCAtIFRBU0sgNCBBU1NJR05NRU5UIC0gVEFTSyA0IFNUQVRVUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC1cbiAgICAgICAgLSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC1cbiAgICAgICAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuVXNlciBNYXJrcyBUYXNrIENvbXBsZXRlXG4gICAgLSBVc2VyIHRlbGxzIGJvdCB0aGV5IGFyZSBkb25lIHdpdGggdGFza1xuICAgICAgICAtIGluY2x1ZGVzIHNvbWUga2luZCBvZiB0YXNrIGlkIHRvIGhlbHAgdGhlIHNlcnZlciBxdWVyeSB0aGUgY29ycmVjdCB0YXNrXG4gICAgLSBTZXJ2ZXIgdXBkYXRlcyB0aGUgdGFzayB0byBjb21wbGV0ZVxuICAgIC0gU2VydmVyIGNoZWNrcyB0byBzZWUgaWYgYWxsIHByb2plY3QgdGFza3MgYXJlIGNvbXBsZXRlXG5cblxuXG5cblxuLy8gVGFza3MgQXNzaWduZWQgLSBBdHRyaWJ1dGUgb24gVGFzayBkb2N1bWVudCBkaWN0YXRlcyB3aG8gdGhlIHRhc2sgaXMgYXNzaWduZWQgdG8uIEFuIGVtcGxveWVlIGNvbmZpcm1zIHRoZWlyIGxpc3Qgd2l0aCBhIHNsYWNrIGNhbGwuXG5cbi8vIFRhc2sgY29tcGxldGVkIC0gVGhyb3VnaCBzbGFjaywgZW1wbG95ZWUgdXBkYXRlcyB0aGUgY29tcGxldGUgYXR0cmlidXRlIGZyb20gZmFsc2UgdG8gdHJ1ZSBvbmNlIHRoZSB0YXNrIGlzIGNvbXBsZXRlZC5cblxuKioqKioqKioqKioqKioqKioqKioqKi9cblxudmFyIGFsbG93ZWREYXlzID0gWydTdW5kYXknLCdNb25kYXknLCdUdWVzZGF5JywnV2VkbmVzZGF5JywnVGh1cnNkYXknLCdGcmlkYXknLCdTYXR1cmRheSddO1xudmFyIGFsbG93ZWRGcmVxdWVuY2llcyA9IFtcIlRyaWdnZXJlZFwiLCBcIlNjaGVkdWxlZFwiXTtcbnZhciBhbGxvd2VkSW50ZXJ2YWxUeXBlcyA9IFsnRGFpbHknLCAnRGFpbHkgQnVzaW5lc3MgRGF5cycsICdXZWVrbHknLCAnQmktV2Vla2x5JywgJ01vbnRobHknLCAnU2VtaS1Nb250bHknLCAnUXVhcnRlcmx5JywgJ0FubnVhbGx5J107XG52YXIgYWxsb3dlZE1vbnRobHlJbnRlcnZhbHMgPSBbJ0phbnVhcnknLCAnRmVicnVhcnknLCAnTWFyY2gnLCAnQXByaWwnLCAnTWF5JywgJ0p1bmUnLCAnSnVseScsICdBdWd1c3QnLCAnU2VwdGVtYmVyJywgJ09jdG9iZXInLCAnTm92ZW1iZXInLCAnRGVjZW1iZXInXTtcbnZhciBhbGxvd2VkQW5udWFsbHlJbnRlcnZhbHMgPSBbXCJGaXJzdCBEYXkgb2YgdGhlIFllYXJcIiwgXCJMYXN0IERheSBvZiB0aGUgWWVhclwiLCBcIkFueSBEYXkgb2YgdGhlIHllYXJcIiwgXCJJbiBhIFBhcnRpY3VsYXIgTW9udGhcIiwgXCJJbiBhIFBhcnRpY3VsYXIgUXVhcnRlclwiLCBcIiMgb2YgRGF5cyBGcm9tIFN0YXJ0XCIsIFwiIyBvZiBEYXlzIEJlZm9yZSBlbmRcIl07XG52YXIgYWxsb3dlZFdlZWtseUludGVydmFscyA9IFsnTW9uZGF5JywgJ1R1ZXNkYXknLCAnV2VkbmVzZGF5JywgJ1RodXJzZGF5JywgJ0ZyaWRheScsICdTYXR1cmRheScsICdTdW5kYXknLCAnQW55J107XG52YXIgYWxsb3dlZFNlbWlNb250aGx5SW50ZXJ2YWxzID0gW1wiMXN0XCIsXCIybmRcIiwgXCIzcmRcIiwgXCI0dGhcIiwgXCI1dGhcIixcIjZ0aFwiLFwiN3RoXCIsXCI4dGhcIixcIjl0aFwiLFwiMTB0aFwiLFwiMTF0aFwiLFwiMTJ0aFwiLFwiMTN0aFwiLFwiMTR0aFwiLFwiMTV0aFwiXTtcbnZhciBhbGxvd2VkUXVhcnRlcmx5SW50ZXJ2YWxzID0gW1wiRmlyc3QgRGF5IG9mIHRoZSBRdWFydGVyXCIsIFwiTGFzdCBEYXkgb2YgdGhlIFF1YXJ0ZXJcIiwgXCIjIERheXMgZnJvbSBTdGFydFwiLCBcIiMgRGF5cyBmcm9tIEVuZFwiLCBcIkFueVwiIF07XG5cbi8vVGhpcyBpcyB0aGUgbW9kZWwgZm9yIHByb2plY3QgdGVtcGxhdGUgY3JlYXRpb24uXG52YXIgVGVtcGxhdGUgPSBtb25nb29zZS5tb2RlbCgnVGVtcGxhdGUnLCBuZXcgbW9uZ29vc2UuU2NoZW1hKHtcbiAgLy9UaGUgbmFtZSB3aWxsIGJlIHRoZSBzYW1lIGZvciBhbGwgcHJvamVjdHMgZ2VuZXJhdGVkIGZyb20gdGhlIHRlbXBsYXRlXG4gIG5hbWU6e3R5cGU6U3RyaW5nfSxcbiAgLy9EZXNjcmlwdGlvbiBpcyB0aGUgIHVuaXF1ZSB2aXN1YWwgaWRlbnRpZmllcyBvZiBhIHByb2plY3Qgb24gdGhlIGZyb250IGVuZFxuICBkZXNjcmlwdGlvbjoge3R5cGU6U3RyaW5nfSxcbiAgdGFza3M6IFtcbiAgICAgICAge3R5cGU6IFN0cmluZyAsIHJlZjogJ1RlbXBsYXRlVGFzayd9XG4gICAgICAgICAgXSxcbiAgc2V0dXA6IHtcbiAgICAgIGNyZWF0ZWQ6IHt0eXBlOiBEYXRlLCBkZWZhdWx0OiBuZXcgRGF0ZSgpfSxcbiAgICAgIHR5cGU6ICB7dHlwZTogU3RyaW5nLCBlbnVtOiBbJ1NpbmdsZScsJ1RyaWdnZXJlZCcsICdTY2hlZHVsZWQnXX0sXG4gICAgICAvL1BpY2sgb25lIG9mIHRoZXNlIHR3byBmcmVxdWVuY3kgb3B0aW9uc1xuICAgICAgLy8gZnJlcXVlbmN5OiAge1xuICAgICAgLy8gICAgIGJ5RGF0ZToge3R5cGU6IEJvb2xlYW59LFxuICAgICAgLy8gICAgIGJ5SW50ZXJ2YWw6IHt0eXBlOiBCb29sZWFufVxuICAgICAgLy8gfSxcbiAgICAgIGZyZXF1ZW5jeTogIHt0eXBlOiBTdHJpbmcsIGVudW06IFsnQnkgRGF0ZScsJ0J5IEludGVydmFsJ119LFxuICAgICAgLy9EdWUgZGF0ZSB3aWxsIHJlcXVpcmUgZnVuY3Rpb24gYmFzZWQgb24gdXNlciBzZWxlY3Rpb24uIFdpbGwgYmUgc3RhbmQgaW4gZm9yIG5leHQgaW5zdGFuY2Ugb3Igc2VsZWN0ZWQgZGF5LlxuICAgICAgZHVlRGF0ZToge3R5cGU6RGF0ZX0sXG4gICAgICBpbnRlcnZhbCA6IHtcbiAgICAgICAgICB0eXBlOiB7dHlwZTogU3RyaW5nLCBlbnVtOiBhbGxvd2VkSW50ZXJ2YWxUeXBlc30sXG4gICAgICAgICAgd2Vla2x5SW50ZXJ2YWw6IHt0eXBlOiBTdHJpbmcsIGVudW06IGFsbG93ZWRXZWVrbHlJbnRlcnZhbHN9LFxuICAgICAgICAgIG1vbnRobHlJbnRlcnZhbDoge1xuICAgICAgICAgICAgc2VsZWN0aW9uOiB7dHlwZTogU3RyaW5nLCBlbnVtOiBhbGxvd2VkTW9udGhseUludGVydmFsc30sXG4gICAgICAgICAgICAvL2Zyb21CZWdpbm5pbmcgYW5kIGZyb21FbmQgd2lsbCByZXF1aXJlIGNhbGN1bGF0aW9uIGJhc2VkIG9uIHVzZXIgaW5wdXQgYnV0IHNob3VsZCBiZSBhdmFpbGFibGUgaW4gdGhlIHRlbXBsYXRlXG4gICAgICAgICAgICBmcm9tQmVnaW5uaW5nOiB7fSxcbiAgICAgICAgICAgIGZyb21FbmQ6IHt9XG4gICAgICAgICAgfSxcbiAgICAgICAgICBhbm51YWxJbnRlcnZhbDoge1xuICAgICAgICAgICAgc2VsZWN0aW9uOiAge3R5cGU6IFN0cmluZywgZW51bTogYWxsb3dlZEFubnVhbGx5SW50ZXJ2YWxzfSxcbiAgICAgICAgICAgIGZyb21CZWdpbm5pbmc6IHt9LFxuICAgICAgICAgICAgZnJvbUVuZDoge31cbiAgICAgICAgICB9LFxuICAgICAgICAgIHF1YXJ0ZXJseUludGVydmFsOiB7XG4gICAgICAgICAgICAgIHNlbGVjdGlvbjp7dHlwZTpTdHJpbmcsIGVudW06IGFsbG93ZWRRdWFydGVybHlJbnRlcnZhbHN9LFxuICAgICAgICAgICAgICBmcm9tQmVnaW5uaW5nOiB7fSxcbiAgICAgICAgICAgICAgZnJvbUVuZDoge31cbiAgICAgICAgICB9LFxuICAgICAgICAgIHNlbWlNb250aGx5SW50ZXJ2YWw6IHtcbiAgICAgICAgICAgIHNlbGVjdGlvbjoge3R5cGU6IFN0cmluZywgZW51bTogYWxsb3dlZFNlbWlNb250aGx5SW50ZXJ2YWxzfSxcbiAgICAgICAgICAgIGZyb21CZWdpbm5pbmc6IHt9LFxuICAgICAgICAgICAgZnJvbUVuZDoge31cbiAgICAgICAgICB9XG4gICAgICB9LFxuICAgICAgaW50ZXJ2YWxUeXBlOiB7dHlwZTogU3RyaW5nLCBlbnVtOiBhbGxvd2VkSW50ZXJ2YWxUeXBlc31cbiAgfVxuXG59KSk7XG5cbi8vIFRoaXMgaXMgdGhlIG1vZGVsIGZvciB0aGUgUHJvamVjdCBjcmVhdGlvblxudmFyIFByb2plY3QgPSBtb25nb29zZS5tb2RlbCgnUHJvamVjdCcsIG5ldyBtb25nb29zZS5TY2hlbWEoe1xuICAvL1RoZSBuYW1lIHdpbGwgYmUgdGhlIHNhbWUgZm9yIGFsbCBwcm9qZWN0cyBnZW5lcmF0ZWQgZnJvbSB0aGUgdGVtcGxhdGVcbiAgbmFtZTp7dHlwZTpTdHJpbmd9LFxuICAvL0Rlc2NyaXB0aW9uIGlzIHRoZSAgdW5pcXVlIHZpc3VhbCBpZGVudGlmaWVzIG9mIGEgcHJvamVjdCBvbiB0aGUgZnJvbnQgZW5kXG4gIGRlc2NyaXB0aW9uOiB7dHlwZTpTdHJpbmd9LFxuICBzdGF0dXM6IHt0eXBlOiBTdHJpbmcsIGVudW06IFsnQ29tcGxldGUnLCAnSW5jb21wbGV0ZSddLCBkZWZhdWx0OiAnSW5jb21wbGV0ZSd9LFxuICB0YXNrczogW1xuICAgICAgICB7dHlwZTogU3RyaW5nICwgcmVmOiAnVGVtcGxhdGVUYXNrJ31cbiAgICAgICAgICBdLFxuICB0aW1ldGFibGU6IHtcbiAgICBmcmVxdWVuY3k6IHt0eXBlOiBTdHJpbmcsIGVudW06IFsnU2luZ2xlJywnVHJpZ2dlcmVkJywgJ1NjaGVkdWxlZCddfSxcbiAgfSxcbiAgc2V0dXA6IHtcbiAgICAgIGNyZWF0ZWQ6IHt0eXBlOiBEYXRlLCBkZWZhdWx0OiBuZXcgRGF0ZSgpfSxcbiAgICAgIHR5cGU6ICB7dHlwZTogU3RyaW5nLCBlbnVtOiBbJ1NpbmdsZScsJ1RyaWdnZXJlZCcsICdTY2hlZHVsZWQnXX0sXG4gICAgICAvL1BpY2sgb25lIG9mIHRoZXNlXG4gICAgICBmcmVxdWVuY3k6ICB7XG4gICAgICAgICAgYnlEYXRlOiB7dHlwZTogQm9vbGVhbn0sXG4gICAgICAgICAgYnlJbnRlcnZhbDoge3R5cGU6IEJvb2xlYW59XG4gICAgICB9LFxuICAgICAgZnJlcXVlbmN5OiAge3R5cGU6IFN0cmluZywgZW51bTogWydCeSBEYXRlJywnQnkgSW50ZXJ2YWwnXX0sXG4gICAgICAvL0R1ZSBkYXRlIHdpbGwgcmVxdWlyZSBmdW5jdGlvbiBiYXNlZCBvbiB1c2VyIHNlbGVjdGlvbi4gV2lsbCBiZSBzdGFuZCBpbiBmb3IgbmV4dCBpbnN0YW5jZSBvciBzZWxlY3RlZCBkYXkuXG4gICAgICBkdWVEYXRlOiB7dHlwZTpEYXRlfSxcbiAgICAgIGludGVydmFsIDoge1xuICAgICAgICAgIHR5cGU6IHt0eXBlOiBTdHJpbmcsIGVudW06IGFsbG93ZWRJbnRlcnZhbFR5cGVzfSxcbiAgICAgICAgICB3ZWVrbHlJbnRlcnZhbDoge3R5cGU6IFN0cmluZywgZW51bTogYWxsb3dlZFdlZWtseUludGVydmFsc30sXG4gICAgICAgICAgbW9udGhseUludGVydmFsOiB7XG4gICAgICAgICAgICBzZWxlY3Rpb246IHt0eXBlOiBTdHJpbmcsIGVudW06IGFsbG93ZWRNb250aGx5SW50ZXJ2YWxzfSxcbiAgICAgICAgICAgIC8vZnJvbUJlZ2lubmluZyBhbmQgZnJvbUVuZCB3aWxsIHJlcXVpcmUgY2FsY3VsYXRpb24gYmFzZWQgb24gdXNlciBpbnB1dCBidXQgc2hvdWxkIGJlIGF2YWlsYWJsZSBpbiB0aGUgdGVtcGxhdGVcbiAgICAgICAgICAgIGZyb21CZWdpbm5pbmc6IHt9LFxuICAgICAgICAgICAgZnJvbUVuZDoge31cbiAgICAgICAgICB9LFxuICAgICAgICAgIGFubnVhbEludGVydmFsOiB7XG4gICAgICAgICAgICBzZWxlY3Rpb246ICB7dHlwZTogU3RyaW5nLCBlbnVtOiBhbGxvd2VkQW5udWFsbHlJbnRlcnZhbHN9LFxuICAgICAgICAgICAgZnJvbUJlZ2lubmluZzoge30sXG4gICAgICAgICAgICBmcm9tRW5kOiB7fVxuICAgICAgICAgIH0sXG4gICAgICAgICAgcXVhcnRlcmx5SW50ZXJ2YWw6IHtcbiAgICAgICAgICAgICAgc2VsZWN0aW9uOnt0eXBlOlN0cmluZywgZW51bTogYWxsb3dlZFF1YXJ0ZXJseUludGVydmFsc30sXG4gICAgICAgICAgICAgIGZyb21CZWdpbm5pbmc6IHt9LFxuICAgICAgICAgICAgICBmcm9tRW5kOiB7fVxuICAgICAgICAgIH0sXG4gICAgICAgICAgc2VtaU1vbnRobHlJbnRlcnZhbDoge1xuICAgICAgICAgICAgc2VsZWN0aW9uOiB7dHlwZTogU3RyaW5nLCBlbnVtOiBhbGxvd2VkU2VtaU1vbnRobHlJbnRlcnZhbHN9LFxuICAgICAgICAgICAgZnJvbUJlZ2lubmluZzoge30sXG4gICAgICAgICAgICBmcm9tRW5kOiB7fVxuICAgICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBpbnRlcnZhbFR5cGU6IHt0eXBlOiBTdHJpbmcsIGVudW06IGFsbG93ZWRJbnRlcnZhbFR5cGVzfVxuICB9XG59KSk7XG5cbnZhciBUZW1wbGF0ZVRhc2sgPSBtb25nb29zZS5tb2RlbCgnVGVtcGxhdGVUYXNrJywgbmV3IG1vbmdvb3NlLlNjaGVtYSh7XG4gIG5hbWU6IHt0eXBlOiBTdHJpbmcsIHJlcXVpcmVkOiB0cnVlfSxcbiAgZGVzY3JpcHRpb246IHt0eXBlOiBTdHJpbmd9LFxuICBhc3NvY2lhdGVkUHJvamVjdCA6IHt0eXBlOlN0cmluZywgcmVmOidQcm9qZWN0J30sXG4gIGRhdGU6IHtcbiAgICBjcmVhdGVkOiB7dHlwZTogRGF0ZSwgZGVmYXVsdDogbmV3IERhdGUoKX0sXG4gICAgZGVhZGxpbmU6IHt0eXBlOiBEYXRlfSxcbiAgfSxcbiAgYXNzaWdtZW50OiB7XG4gICAgICBkZXBhcnRtZW50czoge3R5cGU6U3RyaW5nLCByZWY6ICdEZXBhcnRtZW50J30sXG4gICAgICBwb3NpdGlvbnM6IHt0eXBlOlN0cmluZywgcmVmOiAnUG9zaXRpb24nfSxcbiAgICAgIGVtcGxveWVlczoge3R5cGU6U3RyaW5nLCByZWY6ICdFbXBsb3llZSd9XG4gIH1cbn0pKTtcblxuLy9Nb2RlbCBvZiB0YXNrcyB0aWVkIHRvIGFjdGl2ZSBwcm9qZWN0cy4gUmVmZXJlbmNlcyBkZXBhcnRtZW50LCBwb3NpdGlvbiwgYW5kIGluZGl2aWR1YWxcbnZhciBQcm9qZWN0VGFzayA9IG1vbmdvb3NlLm1vZGVsKCdUYXNrJywgbmV3IG1vbmdvb3NlLlNjaGVtYSh7XG4gIG5hbWU6IHt0eXBlOiBTdHJpbmcsIHJlcXVpcmVkOiB0cnVlfSxcbiAgZGVzY3JpcHRpb246IHt0eXBlOlN0cmluZ30sXG4gIHN0YXR1czoge3R5cGU6IFN0cmluZywgZW51bTogWydDb21wbGV0ZScsICdJbmNvbXBsZXRlJ10sIGRlZmF1bHQ6ICdJbmNvbXBsZXRlJ30sXG4gIGFzc29jaWF0ZWRQcm9qZWN0IDoge3R5cGU6U3RyaW5nLCByZWY6J1Byb2plY3QnfSxcbiAgZGF0ZToge1xuICAgIGNyZWF0ZWQ6IHt0eXBlOiBEYXRlLCBkZWZhdWx0OiBuZXcgRGF0ZSgpfSxcbiAgICBkZWFkbGluZToge30sXG4gIH0sXG4gIGFzc2lnbWVudDoge1xuICAgICAgZGVwYXJ0bWVudHM6IHt0eXBlOlN0cmluZywgcmVmOiAnRGVwYXJ0bWVudCd9LFxuICAgICAgcG9zaXRpb25zOiB7dHlwZTpTdHJpbmcsIHJlZjogJ1Bvc2l0aW9uJ30sXG4gICAgICBlbXBsb3llZXM6IHt0eXBlOlN0cmluZywgcmVmOiAnRW1wbG95ZWUnfVxuICB9XG59KSk7XG5cbi8vTW9kZWwgb2YgdGhlIGNvbXBhbnkncyBpbmZvcm1hdGlvbi4gUmVmZXJlbmNlcyBkZXBhcnRtZW50cywgcG9zaXRpb25zLCBlbXBsb3llZXMuXG52YXIgQ29tcGFueSA9IG1vbmdvb3NlLm1vZGVsKCdDb21wYW55JywgbmV3IG1vbmdvb3NlLlNjaGVtYSh7XG4gIG5hbWU6IHt0eXBlOlN0cmluZywgcmVxdWlyZWQ6dHJ1ZX0sXG4gIC8vQXZhaWxhYmlsaXR5IGluZGljYXRlcyBkYXlzIGFuZCBob3VycyBvZiBvcGVyYXRpb25zIGZvciB0aGUgY29tcGFueS4gVGhpcyB3aWxsIGFmZmVjdCB0aGUgdGltZWxpbmUgb2YgZGVhZGxpbmVzLCBldGMuXG4gIGF2YWlsYWJpbGl0eToge1xuICAgIGRheXM6IFt7dHlwZTogU3RyaW5nLCBlbnVtOiBhbGxvd2VkRGF5cywgcmVxdWlyZWQ6IHRydWV9XSxcbiAgICBob3VyT3Blbjoge3R5cGU6IE51bWJlcn0sXG4gICAgaG91ckNsb3NlZDoge3R5cGU6IE51bWJlcn1cbiAgfSxcbiAgLy9UaGUgYmVsb3cgdGhyZWUgcmVmZXJlbmNlIHRvIHRoZSBzcGVjaWZpYyBkZXBhcnRtZW50cywgcG9zaXRpb25zLCBhbmQgZW1wbG95ZWVzIHdpdGhpbiB0aGUgY29tcGFueS5cbiAgZGVwYXJ0bWVudHM6IFt7dHlwZTogU3RyaW5nLCByZWY6ICdEZXBhcnRtZW50J31dLFxuICBwb3NpdGlvbnM6IFt7dHlwZTogU3RyaW5nLCByZWY6ICdQb3NpdGlvbid9XSxcbiAgZW1wbG95ZWVzIDogW3t0eXBlOiBTdHJpbmcsIHJlZjogJ0VtcGxveWVlJ31dLFxuICAvL0NvbXBhbnktcmVsYXRlZCBzbGFjayBpbmZvcm1hdGlvbiBmb3IgdHlpbmcgdGhlIHNsYWNrIGJvdCBjb21tYW5kcyB0byB0aGUgY29tcGFueSdzIHNsYWNrIGRvbWFpbi5cbiAgc2xhY2s6IHtcbiAgICB0ZWFtX2lkOiB7dHlwZTpTdHJpbmd9LFxuICAgIHRlYW1fZG9tYWluOiB7dHlwZTpTdHJpbmd9LFxuICAgIGNoYW5uZWxzOiBbXG4gICAgICB7XG4gICAgICAgIGNoYW5uZWxfaWQ6IHt0eXBlOlN0cmluZ30sXG4gICAgICAgIGNoYW5uZWxfbmFtZToge3R5cGUgOlN0cmluZ31cbiAgICAgIH1cbiAgICBdXG4gIH1cbn0pKTtcblxuXG4vLyBQb3NpdGlvbi9yb2xlIGVtcGxveWVlcyBoYXZlIGF0IHRoZSBjb21wYW55LlxudmFyIFBvc2l0aW9uID0gbW9uZ29vc2UubW9kZWwoJ1Bvc2l0aW9uJywgbmV3IG1vbmdvb3NlLlNjaGVtYSh7XG4gIG5hbWU6IHt0eXBlOlN0cmluZywgcmVxdWlyZWQ6dHJ1ZX0sXG4gIGVtcGxveWVlczogW1xuICAgICAgICB7dHlwZTpTdHJpbmcsIHJlZjonRW1wbG95ZWUnfVxuICAgICAgXVxufSkpO1xuXG4vL0RlcGFydG1lbnRzIHdpdGhpbiB0aGUgY29tcGFueS5cbnZhciBEZXBhcnRtZW50ID0gbW9uZ29vc2UubW9kZWwoJ0RlcGFydG1lbnQnLCBuZXcgbW9uZ29vc2UuU2NoZW1hKHtcbiAgbmFtZToge3R5cGU6U3RyaW5nLCByZXF1aXJlZDp0cnVlfSxcbiAgZW1wbG95ZWVzOiBbXG4gICAgICAgIHt0eXBlOlN0cmluZywgcmVmOiAnRW1wbG95ZWUnfVxuICAgIF1cbn0pKTtcblxuLy9Vc2VycyBhcmUgYWxsIGVtcGxveWVlcyBvZiB0aGUgY29tcGFueS4gTk9URTogTm90IGFsbCB1c2VycyB3aWxsIGFjdHVhbGx5IGhhdmUgbG9naW4gYWNjZXNzIHRvIHRoZSBVSS5cbnZhciBFbXBsb3llZSA9IG1vbmdvb3NlLm1vZGVsKCdFbXBsb3llZScsIG5ldyBtb25nb29zZS5TY2hlbWEoe1xuICAvL0VtcGxveWVlIG5hbWUgaW5mb3JtYXRpb25cbiAgaWRlbnRpZmljYXRpb246IHtcbiAgICBuYW1lOiB7XG4gICAgICBmaXJzdE5hbWU6IHt0eXBlOiBTdHJpbmd9LFxuICAgICAgbGFzdE5hbWU6IHt0eXBlOiBTdHJpbmd9LFxuICAgICAgZnVsbE5hbWU6IHt0eXBlOiBTdHJpbmd9XG4gICAgfSxcbiAgICAvL0VtcGxveWVlJ3MgdXNlcm5hbWUgZm9yIEF1dGhlbnRpY2F0aW9uLCByZXBvcnRzLCBldGMgaW4gdGhlIFVJLiBPbmx5IGZvciBlbXBsb3llZSdzIHdobyB3b3VsZCBiZSBzdGFydGluZyBwcm9qZWN0cy5cbiAgICB1c2VyTmFtZToge3R5cGU6IFN0cmluZ30sXG4gICAgLy9TbGFjayBoYW5kbGUgdG8gdGllIHRvIHRoZSBzbGFjayBib3QgY29tbWFuZHMuXG4gICAgc2xhY2tIYW5kbGU6IHt0eXBlOiBTdHJpbmd9LFxuICAgIGVtYWlsOiB7dHlwZTogU3RyaW5nfSxcbiAgICBnb29nbGVJZDoge31cbiAgfSxcbiAgLy9UaGlzIGRldGVybWluZXMgd2hldGhlciBhbiBlbXBsb3llZSBoYXMgYWNjZXNzLiBUcnVlID0gYWNjZXNzIHRvIFVJLlxuICBwZXJtaXNzaW9uczoge1xuICAgIGFkbWluOiB7dHlwZTogQm9vbGVhbiwgZGVmYXVsdDogZmFsc2V9XG4gIH0sXG4gIHBvc2l0aW9uczpbe3R5cGU6U3RyaW5nLCByZWY6ICdQb3NpdGlvbid9XSxcbiAgZGVwYXJ0bWVudHM6IFt7dHlwZTpTdHJpbmcsIHJlZjogJ0RlcGFydG1lbnQnfV0sXG59KSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
