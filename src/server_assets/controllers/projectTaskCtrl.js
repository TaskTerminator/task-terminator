const mongoose = require('mongoose');
const randomstring = require('randomstring');
const Project = require('../models/Project.js');
const Task = require('../models/ProjectTask');


module.exports = {

  getTasks(req, res) {
      Project.findById({_id: req.params.id}).exec().then((result) => {
          return res.json(result.tasks);
      }).catch((err) => {
          return res.status(500).end();
      });
  },
<<<<<<< HEAD
    
    addTask(req, res) {
        const newTask = new Task(req.body);
        const ID = req.params.projectid;
        newTask.friendlyId = randomstring.generate({length: 5, readable: true});
        newTask.associatedProject = ID;
        newTask.save()
        .then((task) => {
            Project.findByIdAndUpdate(ID, {$push: {"tasks": task._id}}).exec()
        })
        .then(() => {
            return res.status(201).end();
        })
        .catch((err) => {
            return res.status(500).end();
        });
    },
    
    editTask(req, res) {
        Project.findByIdAndUpdate(req.params.id, req.body).exec().then(() => {
            return res.status(200).end();
        }).catch((err) => {
            return res.status(500).end();
        });
    },
=======

    // addTask(req, res) {
    //     const newTask = new Task(req.params.projectId);
    //     newTask.friendlyId = randomstring.generate({length: 5, readable: true});
    //     newTask.associatedProject = req.params.projectId;
    //     .then((task) => {
    //         console.log("TASKKKKKK", task)
    //         Project.findByIdAndUpdate(req.params.projectId, {$push: {"tasks": task._id}}).exec()
    //     })
    //     .then((project) => {
    //         project.save()
    //         newTask.save()
    //     })
    //     .then((result) => {
    //         return res.json(result);
    //     })
    //     .catch((err) => {
    //         return res.status(500).end();
    //     });
    // },
>>>>>>> master

};
