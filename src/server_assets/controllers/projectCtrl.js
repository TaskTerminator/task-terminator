const mongoose = require('mongoose');
const Project = require('../models/Project.js');
const ProjectTask = require('../models/ProjectTask.js');
const Template = require('../models/Template');
const TemplateTask = require('../models/TemplateTask.js');
const timeCtrl = require('../controllers/timeCtrl');


module.exports = {

  newProject(req, res) {
      //Look up the template that is creating this task
    Template.findById(req.params.templateid).exec().then((template) => {
      //When the template is returned convert it to a true object rather than a mongoose object
      var template_plain = template.toObject();
      var origTemplate_tasks = template_plain.tasks;
      console.log("ORIGINAL TEMPLATE TASKS",origTemplate_tasks);

      //delete the ._id and version fields from the object
      delete template_plain._id;
      delete template_plain.__v;
      delete template_plain.tasks;
        
    if (template_plain.setup.interval.type === 'Weekly') {
        if (template_plain.setup.interval.weeklyInterval !== 'Any') {
            template_plain.setup.dueDate.actual = timeCtrl.weeklySpecificDay(template_plain.setup.interval.weeklyInterval, req.body.instance);
    } else {
        template_plain.setup.dueDate.actual = timeCtrl.weeklyAnyDay(req.body.instance);
        }
    }
    else if (template_plain.setup.interval.type === 'Bi-Weekly') {
        if (template_plain.setup.interval.weeklyInterval !== 'Any') {
            template_plain.setup.dueDate.actual = timeCtrl.biWeeklySpecificDay(template_plain.setup.interval.biWeeklyInterval, req.body.instance);
    } else {
        template_plain.setup.dueDate.actual = timeCtrl.biWeeklyAnyDay(req.body.instance);
        }
    }
    else if (template_plain.setup.interval.type === 'Monthly') {
        if (template_plain.setup.interval.monthlyInterval.firstOfMonth === true) {
            template_plain.setup.dueDate.actual = timeCtrl.monthlyFirstDay();
    } else if (template_plain.setup.interval.monthlyInterval.lastOfMonth === true) {
        template_plain.setup.dueDate.actual = timeCtrl.monthlyLastDay(req.body.instance);
    } else {
        template_plain.setup.dueDate.actual = timeCtrl.monthlyAnyDay(req.body.instance);
        }
    }
    else if (template_plain.setup.interval.type === 'Semi-Monthly') {
        template_plain.setup.dueDate.actual = timeCtrl.semiMonthlyFirstCycle(template_plain.setup.interval.semiMonthlyInterval.fromBeginning);
        template_plain.setup.dueDate.anticipated = timeCtrl.semiMonthlySecondCycle(template_plain.setup.interval.semiMonthlyInterval.fromEnd);
    }
    else if (template_plain.setup.interval.type === 'Quarterly') {
        if (template_plain.setup.interval.quarterlyInterval.selection === 'First Day of the Quarter') {
            template_plain.setup.dueDate.actual = timeCtrl.quarterlyFirstDay();
        } else if (template_plain.setup.interval.quarterlyInterval.selection === 'Last Day of the Quarter') {
            template_plain.setup.dueDate.actual = timeCtrl.quarterlyLastDay(req.body.instance);
        } else if (template_plain.setup.interval.quarterlyInterval.selection === '# Days from Start') {
            template_plain.setup.dueDate.actual = timeCtrl.quarterlyDaysFromStart(template_plain.setup.interval.quarterlyInterval.fromBeginning, req.body.instance);
        } else if (template_plain.setup.interval.quarterlyInterval.selection === '# Days from End') {
            template_plain.setup.dueDate.actual = timeCtrl.quarterlyDaysBeforeEnd(template_plain.setup.interval.quarterlyInterval.fromEnd, req.body.instance);
        } else {
            template_plain.setup.dueDate.actual = timeCtrl.quarterlyAnyDay(req.body.instance);
        }
    } 
    else if (template_plain.setup.interval.type === 'Annually') {
        if (template_plain.setup.interval.annualInterval === 'First Day of the Year') {
            template_plain.setup.dueDate.actual = timeCtrl.annuallyFirstDay(req.body.instance);
        } else if (template_plain.setup.interval.annualInterval.selection === 'Last Day of the Year') {
            template_plain.setup.dueDate.actual = timeCtrl.annuallyLastDay(req.body.instance);
        } else if (template_plain.setup.interval.annualInterval.selection === 'In a Particular Month') {
            template_plain.setup.dueDate.actual = timeCtrl.annuallyParticularMonth(template_plain.setup.interval.annualInterval.selectMonth, req.body.instance);
        } else if (template_plain.setup.interval.annualInterval.selection === 'In a Particular Quarter') {
            template_plain.setup.dueDate.actual = timeCtrl.annuallyParticularQuarter(template_plain.setup.interval.annualInterval.selectQuarter, req.body.instance);
        } else if (template_plain.setup.interval.annualInterval.selection === '# of Days From Start') {
            template_plain.setup.dueDate.actual = timeCtrl.annuallyDaysFromStart(template_plain.setup.interval.annualInterval.fromBeginning, req.body.instance);
        } else if (template_plain.setup.interval.annualInterval.selection === '# of Days Before End') {
            template_plain.setup.dueDate.actual = timeCtrl.annuallyDaysBeforeEnd(template_plain.setup.interval.annualInterval.fromEnd, req.body.instance);
        } else {
            template_plain.setup.dueDate.actual = timeCtrl.annuallyAnyDay(req.body.instance);
        }
    };

      //enstanciate a new project object
      let newProject = new Project(template_plain);
        //get the project specific description from the req.body
        newProject.description = req.body.description;


        var newTaskIds = [];
        for(var i = 0; i < origTemplate_tasks.length; i ++){
          console.log("A Task",origTemplate_tasks[i]);

          TemplateTask.findById(origTemplate_tasks[i])
            .exec()
            .then((returnedTask) => {
              console.log("ORIGINAL TASK PRE MANIPULATION", returnedTask);
              var task_plain = returnedTask.toObject();
              delete task_plain._id;
              delete task_plain.__v;
              delete task_plain.date.created;
              task_plain.associatedProject = newProject._id;

              console.log("MANIPULATED TASK", task_plain);
              var newProjectTask = new ProjectTask(task_plain);
              console.log("NEW TASK ID", newProjectTask._id);
              newTaskIds.push(newProjectTask._id);
              newProjectTask.save();
            });
        }

        newProject.tasks = newTaskIds;

        newProject.save().then(() => {
            return res.status(200).end();
        }).catch((err) => {
          console.log("bad dog", err);
            return res.status(500).end();
    }).catch((err) => {
      console.log("badder dog", err);
    });
  });
},

  oneProject(req, res) {
    Project.findById(req.params.id).exec().then((result) => {
      return res.json(result);
    }).catch((err) => {
      return res.status(500).end();
    });
  },

  editProject(req, res) {
    Project.update({_id: req.params.id}, req.body).then(() => {
      return res.status(200).end();
    }).catch((err) => {
      return res.status(500).end();
    });
  },

  deleteProject(req, res) {
    Project.remove({_id: req.params.id}, req.body).then(() => {
      return res.status(200).end();
    }).catch((err) => {
      return res.status(500).end();
    });
  },


  allProjects(req, res) {
    Project.find().exec().then((result) => {
      return res.json(result);
    }).catch((err) => {
      return res.status(500).end();
    });
  }

};

    