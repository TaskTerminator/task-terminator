const mongoose = require('mongoose');
const TemplateTask = require('../models/TemplateTask.js');

module.exports = {

  getAllTasks(req, res) {
    console.log('GET - ALL TEMPLATE TASKS ENDPOINT');
    return res.status(200).end();
  },

  getTasks(req, res) {
    console.log('GET - TASKS FOR TEMPLATE: ', req.params.id);
    return res.status(200).end();
  }

};
