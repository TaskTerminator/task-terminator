const mongoose = require('mongoose');
const Employee = require('../models/Employee.js');
const Template = require('../models/Template.js');
const TemplateTask = require('../models/TemplateTask.js');
const ProjectTask = require('../models/ProjectTask.js');
const Q = require('q');
const timeCtrl = require('../controllers/timeCtrl.js');
const randomstring = require('randomstring');

module.exports = {

  getTaskArray(id) {
    console.log("#16 - Made it the Task Array");
    var deferred = Q.defer();
      Template.findById(id)
        .exec()
        .then((template) => {
          const taskArray = template.tasks;
          deferred.resolve(taskArray);
        });
      return deferred.promise;
    },

    makeTemplateTaskObject(id, associatedProjectId) {
      console.log("#18 - Made it to Template Task Object");
      var deferred = Q.defer();
      TemplateTask.findById(id)
        .exec()
        .then((returnedTask) => {
          const task_plain = returnedTask.toObject();
          delete task_plain._id;
          delete task_plain.__v;
          delete task_plain.date.created;
          deferred.resolve(task_plain);
        });
      return deferred.promise;
    },

    makeProjectObject(id) {
      console.log("#2 - Make Project Object Called");
      var deferred = Q.defer();
      Template.findById(id)
        .exec()
        .then((template) => {
          var new_Object = template.toObject();
          delete new_Object._id;
          delete new_Object.__v;
          delete new_Object.tasks;
          deferred.resolve(new_Object);
        });
      return deferred.promise;
    },

    makeProjectTask(object, associatedProjectId){
      console.log("#21 Made it to Make Project Task");
      var deferred = Q.defer();
      var newTask = new ProjectTask(object);
      newTask.friendlyId = randomstring.generate({length: 5, readable: true});
      newTask.associatedProject = associatedProjectId;
      newTask.save().then((task) => {
        deferred.resolve(task._id);
      });
      return deferred.promise;
    },

    // makeProjectTask(object, associatedProjectId){
    //   var deferred = Q.defer();
    //   var projectTaskIds = [];
    //   var allThePromises = [];
    //   for(var i = 0; i < object.length; i ++){
    //     var newTask = new ProjectTask(object[i]);
    //     newTask.associatedProject = associatedProjectId;
    //     projectTaskIds.push(newTask._id);
    //     allThePromises.push(newTask.save());
    //   }
    //   Q.all(allThePromises);
    //   deferred.resolve(projectTaskIds);
    //   return deferred.promise;
    // },

    nextOccurrence(template, instance) {
      console.log("#6 - Next Occurance Called");
      console.log("#7 - Interval Type ", template.setup.interval.type);
      var deferred = Q.defer();
      var deadline;
      var intervalType = template.setup.interval.type;
      var path = "template.setup.interval";
      console.log("#8 - Path", path);

      if (intervalType === 'Weekly') {
        if (template.setup.interval.weeklyInterval !== 'Any') {
          deadline = timeCtrl.weeklySpecificDay(template.setup.interval.weeklyInterval, instance);
        } else {
          deadline = timeCtrl.weeklyAnyDay(instance);
        }
      } else if (intervalType === 'Bi-Weekly') {
        if (template.setup.interval.weeklyInterval !== 'Any') {
          deadline = timeCtrl.biWeeklySpecificDay(template.setup.interval.biWeeklyInterval, instance);
        } else {
          deadline = timeCtrl.biWeeklyAnyDay(instance);
        }
      } else if (intervalType === 'Monthly') {
        if (template.setup.interval.monthlyInterval.firstOfMonth === true) {
          deadline = timeCtrl.monthlyFirstDay();
        } else if (template.setup.interval.monthlyInterval.lastOfMonth === true) {
          deadline = timeCtrl.monthlyLastDay(instance);
        } else {
          deadline = timeCtrl.monthlyAnyDay(instance);
        }
      } else if (intervalType === 'Semi-Monthly') {
        deadline = timeCtrl.semiMonthlyFirstCycle(template.setup.interval.semiMonthlyInterval.fromBeginning);
        template.setup.dueDate.anticipated = timeCtrl.semiMonthlySecondCycle(template.setup.interval.semiMonthlyInterval.fromEnd);
      } else if (intervalType === 'Quarterly') {
        if (template.setup.interval.quarterlyInterval.selection === 'First Day of the Quarter') {
          deadline = timeCtrl.quarterlyFirstDay();
        } else if (template.setup.interval.quarterlyInterval.selection === 'Last Day of the Quarter') {
          deadline = timeCtrl.quarterlyLastDay(instance);
        } else if (template.setup.interval.quarterlyInterval.selection === '# Days from Start') {
          deadline = timeCtrl.quarterlyDaysFromStart(template.setup.interval.quarterlyInterval.fromBeginning, instance);
        } else if (template.setup.interval.quarterlyInterval.selection === '# Days from End') {
          deadline = timeCtrl.quarterlyDaysBeforeEnd(template.setup.interval.quarterlyInterval.fromEnd, instance);
        } else {
          deadline = timeCtrl.quarterlyAnyDay(instance);
        }
      } else if (intervalType === 'Annually') {
        console.log("#10 - Made it to the correct type");
        if (template.setup.interval.annualInterval === 'First Day of the Year') {
          deadline = timeCtrl.annuallyFirstDay(instance);
        } else if (template.setup.interval.annualInterval.selection === 'Last Day of the Year') {
          deadline = timeCtrl.annuallyLastDay(instance);
        } else if (template.setup.interval.annualInterval.selection === 'In a Particular Month') {

          console.log("#11 - Make it to the correct annual selection!");
          deadline = timeCtrl.annuallyParticularMonth(template.setup.interval.annualInterval.selectMonth, instance);
          console.log("#13 - Deadline", deadline);


        } else if (template.setup.interval.annualInterval.selection === 'In a Particular Quarter') {
          deadline = timeCtrl.annuallyParticularQuarter(template.setup.interval.annualInterval.selectQuarter, instance);
        } else if (template.setup.interval.annualInterval.selection === '# of Days From Start') {
          deadline = timeCtrl.annuallyDaysFromStart(template.setup.interval.annualInterval.fromBeginning, instance);
        } else if (template.setup.interval.annualInterval.selection === '# of Days Before End') {
          deadline = timeCtrl.annuallyDaysBeforeEnd(template.setup.interval.annualInterval.fromEnd, instance);
        } else {
          deadline = timeCtrl.annuallyAnyDay(instance);
        }
      }
      deferred.resolve(deadline);
      return deferred.promise;
    },

    triggeredProject(date) {
      let deadline = '';
      if (template.setup.dueDate.target === 'Today') {
        date = timeCtrl.deadlineToday();
      } else if (template.setup.dueDate.target === 'Specific Date') {
        date = timeCtrl.dateDeadline(date);
      }
      deadline = template.setup.dueDate.actual;
      return deadline;
    },

};
