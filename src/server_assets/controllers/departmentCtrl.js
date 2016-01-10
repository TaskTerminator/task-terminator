const mongoose = require('mongoose');
const Department = require('../models/Department.js');

module.exports = {

  newDepartment: function(req, res) {
    console.log("POST - ADD DEPARTMENT ENDPOINT");
    return res.status(200).end();
  },

  oneDepartment: function(req,res){
    console.log("GET - DEPARTMENT ID: ", req.params.id);
    return res.status(200).end();
  },

  editDepartment: function(req,res){
    console.log("PUT - EDIT DEPARTMENT ID: ", req.params.id);
    return res.status(200).end();
  },

  deleteDepartment: function(req,res){
    console.log('DELETE - DEPARTMENT ID: ', req.params.id);
    return res.status(200).end();
  },

  allDepartments: function(req, res) {
    console.log('GET - ALL DEPARTMENTS ENDPOINT');
    return res.status(200).end();
  }

};
