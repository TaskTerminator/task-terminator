const mongoose = require('mongoose');
const TemplateTask = require('../models/TemplateTask.js');
const Template = require('../models/Template.js');
const moment = require('moment');
const time = require('../controllers/timeCtrl.js');

module.exports = {

<<<<<<< HEAD
  addTask(req, res) {
      console.log("ADD TASK ENDPOINT");
      const newTemplateTask = new TemplateTask(req.body);
      Template
=======
addTask(req, res) {
  const newTemplateTask = new TemplateTask(req.body);
  Template
>>>>>>> master
        .findOne({
          _id: req.params.templateid
        })
        .exec()
        .then(function(result) {
          // console.log(result);
          result.tasks.push(newTemplateTask._id);
          result.save();
        });

      newTemplateTask.save().then((result) => {
        return res.json(result);
      }).catch((err) => {
        return res.status(500).end();
      });
    },


<<<<<<< HEAD
    getAllTasks(req, res) {
      console.log('GET - ALL TEMPLATE TASKS ENDPOINT');
      return res.status(200).end();
    },

    getTasks(req, res) {
      console.log('GET - TASKS FOR TEMPLATE: ', req.params.id);
      return res.status(200).end();
    }
=======
  getAllTasks(req, res) {
      TemplateTask.find().exec().then((result) => {
          return res.json(result);
      }).catch((err) => {
          return res.status(500).end();
      });
  },

  getTasks(req, res) {
      Template.findById({_id: req.params.id}).exec().then((result) => {
          return res.json(result.tasks);
      }).catch((err) => {
          return res.status(500).end();
      });
  }
>>>>>>> master

};
