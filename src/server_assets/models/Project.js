const mongoose = require('mongoose');

const allowedDays = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const allowedFrequencies = ["Triggered", "Scheduled"];
const allowedIntervalTypes = ['Daily', 'Daily Business Days', 'Weekly', 'Bi-Weekly', 'Monthly', 'Semi-Montly', 'Quarterly', 'Annually'];
const allowedMonthlyIntervals = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const allowedAnnuallyIntervals = ["First Day of the Year", "Last Day of the Year", "Any Day of the year", "In a Particular Month", "In a Particular Quarter", "# of Days From Start", "# of Days Before end"];
const allowedWeeklyIntervals = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Any'];
const allowedSemiMonthlyIntervals = ["1st","2nd", "3rd", "4th", "5th","6th","7th","8th","9th","10th","11th","12th","13th","14th","15th"];
const allowedQuarterlyIntervals = ["First Day of the Quarter", "Last Day of the Quarter", "# Days from Start", "# Days from End", "Any" ];
const targets = ['Today', 'Specific Date' ];


// This is the model for the Project creation
const projectSchema = new mongoose.Schema({
  //_id: {type:mongoose.Schema.Types.ObjectId, default: function () { return new mongoose.Schema.Types.ObjectId();} },
  //The name will be the same for all projects generated from the template
  name:{type:String},
  //Description is the  unique visual identifies of a project on the front end
  description: {type:String},
  friendlyId: {type: String},
  status: {type: String, enum: ['Complete', 'Incomplete'], default: 'Incomplete'},
  tasks: [
        {type: String , ref: 'ProjectTask'}
          ],
    overdue: {type: Boolean, default: false},
  setup: {
      created: {type: Date, default: new Date()},
      type:  {type: String, enum: ['Single','Triggered', 'Scheduled']},
      //Pick one of these
      // frequency:  {
      //     byDate: {type: Boolean},
      //     byInterval: {type: Boolean}
      // },
      frequency:  {type: String, enum: ['By Date','By Interval']},
      //Due date will require function based on user selection. Will be stand in for next instance or selected day.
      dueDate: {
          actual: {type:Date, default: new Date()},
          anticipated: {type:Date, default: new Date()},
          target: {type: String, enum: targets}
      },
      interval : {
          type: {type: String, enum: allowedIntervalTypes},
          weeklyInterval: {type: String, enum: allowedWeeklyIntervals},
          monthlyInterval: {
            selection: {type: String, enum: allowedMonthlyIntervals},
            //fromBeginning and fromEnd will require calculation based on user input but should be available in the template
            fromBeginning: {},
            fromEnd: {}
          },
          annualInterval: {
            selection:  {type: String, enum: allowedAnnuallyIntervals},
            fromBeginning: {},
            fromEnd: {}
          },
          quarterlyInterval: {
              selection:{type:String, enum: allowedQuarterlyIntervals},
              fromBeginning: {},
              fromEnd: {}
          },
          semiMonthlyInterval: {
            selection: {type: String, enum: allowedSemiMonthlyIntervals},
            fromBeginning: {},
            fromEnd: {}
          }
      },
      associatedTemplate: {type: String, ref: "Template"},
      critical: {type: Boolean, default: false},
      projectUrl: {type:String}
  }
});

module.exports = mongoose.model('Project', projectSchema);
