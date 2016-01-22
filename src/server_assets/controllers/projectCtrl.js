const mongoose = require('mongoose');
const Project = require('../models/Project.js');
const ProjectTask = require('../models/ProjectTask.js');
const Template = require('../models/Template');
const TemplateTask = require('../models/TemplateTask.js');
const timeCtrl = require('../controllers/timeCtrl');
const helpers = require('../controllers/projectHelpers');
const _ = require('underscore');
const Q = require('q');
const randomstring = require('randomstring');



module.exports = {
    
    endpointProject(req, res) {
        var templateId = req.params.templateid;
        var instance = req.body.instance;
        var description = req.body.description;
        module.exports.newProject(templateId, instance, description)
        .then((project) => {
            return res.json(project);
        });
    },

  newProject(templateId, instance, description) {
    console.log("#1 - New Project Function Called");
      var deferred = Q.defer();
    var associatedProjectId;
    var newProject;
    helpers.makeProjectObject(templateId)
      .then((cleanObject) => {
        console.log("#3 - Make Project Object Returned: ", cleanObject);
        newProject = new Project(cleanObject);
        newProject.friendlyId = randomstring.generate({length: 5, readable: true});
        console.log("#4 - New Project Id : ", newProject._id);
        associatedProjectId = newProject._id;
        console.log("#5 - associatedProjectId :", associatedProjectId);
        return helpers.nextOccurrence(cleanObject, instance);
      })
      .then((deadline) => {
        console.log("#14 - Next Occurance Returned: ", deadline);
        newProject.setup.dueDate.actual = deadline;
        console.log("#15 - New Project Deadline Set : ", newProject.setup.dueDate.actual);
        return helpers.getTaskArray(templateId);
      })
      .then((arrayofIds) => {
        console.log("#17 - Returned From Task Array Helper ", arrayofIds);
        //for every id, make a new project task
        var new_tasks_promises = _.map(arrayofIds, function(id) {
          console.log("Array of Ids ID ", id);
          return helpers.makeTemplateTaskObject(id, associatedProjectId);
        });
        //new_tasks_promises now contains an array of promises which will be resolved as each of the tasks are created
        console.log("#19 - Array of New Task Promises", new_tasks_promises);
        return Q.all(new_tasks_promises);
      })
      .then((clean_objects) =>{
        console.log("#20 - Array of New Task Objects", clean_objects);
        return Q.all(_.map(clean_objects, (clean_object) => {
          return helpers.makeProjectTask(clean_object, associatedProjectId);
        }));
      })
      .then((project_tasks) => {
        console.log("#22 - Project Tasks", project_tasks);
        //take tasks, put in Project, save
        newProject.description = description;
        for (var i = 0; i < project_tasks.length; i++) {
          newProject.tasks.push(project_tasks[i]);
        }
        newProject.associatedTemplate = templateId;
        newProject.save().then((project) => {
          console.log("Made it!");
            deferred.resolve(project);
        });
      });
      return deferred.promise;
    },
    
    newSingleProject(req, res) {
        const newProject = new Project(req.body);
        newProject.friendlyId = randomstring.generate({length: 5, readable: true});
        newProject.save()
        .then((project) => {
            return res.json(project);
        }).catch((err) => {
            return res.status(500).end();
        });
    },
    
    newTriggeredProject(req, res) {
        console.log("#1 - New Project Function Called");
        var templateId = req.params.templateid;
        var instance = req.body.instance;
        var description = req.body.description;
        var associatedProjectId;
        var newProject;
        helpers.makeProjectObject(templateId)
          .then((cleanObject) => {
            console.log("#3 - Make Project Object Returned: ", cleanObject);
            newProject = new Project(cleanObject);
            newProject.friendlyId = randomstring.generate({length: 5, readable: true});
            console.log("#4 - New Project Id : ", newProject._id);
            associatedProjectId = newProject._id;
            console.log("#5 - associatedProjectId :", associatedProjectId);
            return timeCtrl.triggeredProjectDeadline();
          })
          .then((deadline) => {
            console.log("#14 - Next Occurance Returned: ", deadline);
            newProject.setup.dueDate.actual = deadline;
            console.log("#15 - New Project Deadline Set : ", newProject.setup.dueDate.actual);
            return helpers.getTaskArray(templateId);
          })
          .then((arrayofIds) => {
            console.log("#17 - Returned From Task Array Helper ", arrayofIds);
            //for every id, make a new project task
            var new_tasks_promises = _.map(arrayofIds, function(id) {
              console.log("Array of Ids ID ", id);
              return helpers.makeTemplateTaskObject(id, associatedProjectId);
            });
            //new_tasks_promises now contains an array of promises which will be resolved as each of the tasks are created
            console.log("#19 - Array of New Task Promises", new_tasks_promises);
            return Q.all(new_tasks_promises);
          })
          .then((clean_objects) =>{
            console.log("#20 - Array of New Task Objects", clean_objects);
            return Q.all(_.map(clean_objects, (clean_object) => {
              return helpers.makeProjectTask(clean_object, associatedProjectId);
            }));
          })
          .then((project_tasks) => {
            console.log("#22 - Project Tasks", project_tasks);
            //take tasks, put in Project, save
            newProject.description = description;
            for (var i = 0; i < project_tasks.length; i++) {
              newProject.tasks.push(project_tasks[i]);
            }
            newProject.save().then((project) => {
              console.log("Made it!");
              return res.json(project);
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
