const mongoose = require('mongoose');
const TemplateTask = require('../models/TemplateTask.js');
const Template = require('../models/Template.js');
const moment = require('moment');
const time = require('../controllers/timeCtrl.js');

module.exports = {

    addTask(req, res) {
      const newTemplateTask = new TemplateTask(req.body);
      Template
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
};
