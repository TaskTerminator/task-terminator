'use strict';

var mongoose = require("mongoose");

//Departments within the company.
var departmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  employees: [{ type: String, ref: 'Employee' }]
});

module.exports = mongoose.model('Department', departmentSchema);