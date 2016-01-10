const mongoose = require('mongoose');
const Project = require('../models/Project.js');

module.exports = {

  newProject: function(req, res) {
    console.log("POST - NEW PROJECT ENDPOINT");
    return res.status(200).end();
  },

  oneProject: function(req, res) {
    console.log("GET - PROJECT ID: ", req.params.id);
    return res.status(200).end();
  },

  editProject: function(req, res) {
    console.log("EDIT - PROJECT ID: ", req.params.id);
    return res.status(200).end();
  },

  deleteProject: function(req, res) {
    console.log("DELETE - PROJECT ID: ", req.params.id);
    return res.status(200).end();
  },


  allProjects: function(req,res){
    console.log('GET - ALL PROJECTS ENDPOING');
    return res.status(200).end();
  }

};
