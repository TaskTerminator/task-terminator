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
var allowedQuarterlyInterval = ["First Day of the Quarter", "Last Day of the Quarter", "# Days from Start", "# Days from End", "Any"];

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