const mongoose = require('mongoose');
const Employee = require('../models/Employee.js');

module.exports = {

  newEmployee: function(req,res){
    console.log("POST - ADD EMPLOYEE ENDPOINT");
    return res.status(200).end();
  },

  oneEmployee: function(req,res){
    console.log("GET - EMPLOYEE ID: ", req.params.id);
    return res.status(200).end();
  },

  deleteEmployee: function(req,res){
    console.log("DELETE - EMPLOYEE ID: ", req.params.id);
    return res.status(200).end();
  },

  editEmployee: function(req,res){
    console.log("EDIT - EMPLOYEE ID: ", req.params.id);
    return res.status(200).end();
  },

  allEmployees : function(req,res){
    console.log('GET - ALL EMPLOYEES ENDPOINT');
    return res.status(200).end();
  }

};
