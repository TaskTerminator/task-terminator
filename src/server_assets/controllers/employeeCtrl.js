const mongoose = require('mongoose');
const Employee = require('../models/Employee.js');

module.exports = {

newEmployee: function(req,res){
  console.log("POST - ADD EMPLOYEE ENDPOINT");
  return res.status(200).end();
}

};
