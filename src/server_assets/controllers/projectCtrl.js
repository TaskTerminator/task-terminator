const mongoose = require('mongoose');
const Project = require('../models/Project.js');

module.exports = {

newProject: function(req,res){
  console.log("POST - ADD PROJECT ENDPOINT");
  return res.status(200).end();
}

};
