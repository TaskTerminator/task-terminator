const mongoose = require('mongoose');
const ProjectTask = require('../models/ProjectTask.js');


module.exports = {

  getTasks: function(req,res){
    console.log('GET - TASKS FOR PROJECT: ', req.params.id);
    return res.status(200).end();
  }

};
