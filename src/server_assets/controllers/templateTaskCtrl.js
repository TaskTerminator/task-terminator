const mongoose = require('mongoose');
const TemplateTask = require('../models/TemplateTask.js');
const Template = require('../models/Template.js');
const moment = require('moment');

module.exports = {

addTask(req,res){
  console.log("ADD TASK ENDPOINT");
  const newTemplateTask = new TemplateTask(req.body);
  Template
        .findOne({
          _id: req.params.templateid
        })
        .exec()
        .then(function(result) {
          console.log(result);
          result.tasks.push(newTemplateTask._id);
          result.save();
          // console.log(result);
        });
  newTemplateTask.save().then((result) =>{
    return res.json(result);
  }).catch((err) => {
    return res.status(500).end();
  });
},


  getAllTasks(req, res) {
    console.log('GET - ALL TEMPLATE TASKS ENDPOINT');
    return res.status(200).end();
  },

  getTasks(req, res) {
    console.log('GET - TASKS FOR TEMPLATE: ', req.params.id);
    return res.status(200).end();
  }

};
