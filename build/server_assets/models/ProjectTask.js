'use strict';

var mongoose = require('mongoose');

//Model of tasks tied to active projects. References department, position, and individual
var projectTaskSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  status: { type: String, enum: ['Complete', 'Incomplete'], default: 'Incomplete' },
  associatedProject: { type: String, ref: 'Project' },
  date: {
    created: { type: Date, default: new Date() },
    deadline: {}
  },
  assigment: {
    departments: { type: String, ref: 'Department' },
    positions: { type: String, ref: 'Position' },
    employees: { type: String, ref: 'Employee' }
  }
});

module.exports = mongoose.model('ProjectTask', projectTaskSchema);