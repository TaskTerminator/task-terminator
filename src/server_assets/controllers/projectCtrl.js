const mongoose = require('mongoose');
const Project = require('../models/Project.js');
const ProjectTask = require('../models/ProjectTask.js');
const Template = require('../models/Template');
const TemplateTask = require('../models/TemplateTask.js');
const timeCtrl = require('../controllers/timeCtrl');
const helpers = require('../controllers/projectHelpers');
const _ = require('underscore');


module.exports = {

  newProject(req, res) {
    var templateId = req.params.templateid;
    var instance = req.body.instance;

    helpers.makeProjectObject(templateId)
      .then((cleanObject) => {
        var newProject = new Project(cleanObject);
        var associatedProjectId = newProject._id;
        return helpers.nextOccurrence(cleanObject, instance);
      })
      .then((deadline) => {
        newProject.setup.dueDate.actual = deadline;
        return helpers.getTaskArray(templateid);
      })
      .then((arrayofIds) => {
        //for every id, make a new project task
        var new_tasks_promises = _.map(arrayofIds, function(id) {
          return helpers.makeTemplateTaskObject(id, associatedProjectId);
        });
        //new_tasks_promises now contains an array of promises which will be resolved as each of the tasks are created
        return q.all(new_tasks_promises);
      })
      .then((clean_objects) =>{
        return q.all(_.map(clean_objects, (clean_object) => {
          return helpers.makeProjectTask(clean_object);
        }));
      })
      .spread((project_tasks) => {
        //take tasks, put in Project, save

      });








  //     //Look up the template that is creating this task
  //   Template.findById(req.params.templateid).exec().then((template) => {
  //     //When the template is returned convert it to a true object rather than a mongoose object
  //     var template_plain = template.toObject();
  //     var origTemplate_tasks = template_plain.tasks;
  //     console.log("ORIGINAL TEMPLATE TASKS",origTemplate_tasks);
  //
  //     //delete the ._id and version fields from the object
  //     delete template_plain._id;
  //     delete template_plain.__v;
  //     delete template_plain.tasks;
  //
  //     //enstanciate a new project object
  //     let newProject = new Project(template_plain);
  //       //get the project specific description from the req.body
  //       newProject.description = req.body.description;
  //
  //
  //       var newTaskIds = [];
  //       for(var i = 0; i < origTemplate_tasks.length; i ++){
  //         console.log("A Task",origTemplate_tasks[i]);
  //
  //         TemplateTask.findById(origTemplate_tasks[i])
  //           .exec()
  //           .then((returnedTask) => {
  //             console.log("ORIGINAL TASK PRE MANIPULATION", returnedTask);
  //             var task_plain = returnedTask.toObject();
  //             delete task_plain._id;
  //             delete task_plain.__v;
  //             delete task_plain.date.created;
  //             task_plain.associatedProject = newProject._id;
  //
  //             console.log("MANIPULATED TASK", task_plain);
  //             var newProjectTask = new ProjectTask(task_plain);
  //             console.log("NEW TASK ID", newProjectTask._id);
  //             newTaskIds.push(newProjectTask._id);
  //             newProjectTask.save();
  //           });
  //       }
  //
  //       newProject.tasks = newTaskIds;
  //
  //       newProject.save().then(() => {
  //           return res.status(200).end();
  //       }).catch((err) => {
  //         console.log("bad dog", err);
  //           return res.status(500).end();
  //   }).catch((err) => {
  //     console.log("badder dog", err);
  //   });
  // });
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
