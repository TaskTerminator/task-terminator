const mongoose = require('mongoose');
const Employee = require('../models/Employee.js');

module.exports = {

  newEmployee: function(req,res){
    console.log("POST - ADD EMPLOYEE ENDPOINT", req.body);
    var employee = new Employee(req.body);
    employee.identification.name.fullName = req.body.identification.name.firstName + " " + req.body.identification.name.lastName;
    employee.save().then(function(err,result){
        if(!err){
          console.log("POST - ADD EMPLOYEE ERROR", err);
        }
        console.log("POST - ADD EMPLOYEE SUCCESS");
      }
    );
    return res.status(201).end();
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
