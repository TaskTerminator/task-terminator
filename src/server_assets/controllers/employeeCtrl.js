const mongoose = require('mongoose');
const Employee = require('../models/Employee.js');

module.exports = {

  newEmployee: function(req,res){
    console.log("POST - ADD EMPLOYEE ENDPOINT");
    return res.status(200).end();
  },

  allEmployees : function(req,res){
    console.log('GET - ALL EMPLOYEES ENDPOINT');
    return res.status(200).end();
  }

};
