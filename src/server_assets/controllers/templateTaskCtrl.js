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
        
        console.log("MOMENT DAY: ",  time.today());
        console.log("NEXT BUSINESS DAY", time.nextBusinessDay());
        console.log("WEEKLY ANY DAY: ", time.weeklyAnyDay()._d);
        console.log("WEEKLY SPECIFIC DAY - MON: ", time.weeklySpecificDay(1)._d);
        console.log("WEEKLY SPECIFIC DAY - WED: ", time.weeklySpecificDay(3)._d);
        console.log("WEEKLY SPECIFIC DAY - FRI: ", time.weeklySpecificDay(5)._d);
        console.log("BIWEEKLY ANY DAY: ", time.biWeeklyAnyDay()._d);
        console.log("BIWEEKLY SPECIFIC DAY - MON: ", time.biWeeklySpecificDay(1)._d);
        console.log("BIWEEKLY SPECIFIC DAY - WED: ", time.biWeeklySpecificDay(3)._d);
        console.log("BIWEEKLY SPECIFIC DAY - FRI: ", time.biWeeklySpecificDay(5)._d);

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
