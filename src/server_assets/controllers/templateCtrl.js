const mongoose = require('mongoose');
const Template = require('../models/Template.js');
const TemplateTask = require('../models/TemplateTask.js');
const Department = require('../models/Department.js');
const Position = require('../models/Position.js');
const Employee = require('../models/Employee.js');

module.exports = {

newTemplate(req, res) {
  const template = new Template(req.body);
  template.save().then((result) => {
    return res.json(result);
  }).catch((err) => {
    return res.status(500).end();
  });
},

oneTemplate(req, res) {

  var templateDepartments = {
    path: 'tasks',
    model: 'TemplateTask',
    populate: [{
      path: "assignment.departments",
      model: "Department",
      select: "name"
    }]
  }
  var templatePositions = {
    path: 'tasks',
    model: 'TemplateTask',
    populate: [{
      path: "assignment.positions",
      model: "Position",
      select: "name"
    }]
  }
  var templateEmployees = {
    path: 'tasks',
    model: 'TemplateTask',
    populate: [{
      path: "assignment.employees",
      model: "Employee",
      select: "name"
    }]
  }
  //   {
  //     path: "assignment.positions",
  //     model: "Position",
  //     select: "name"
  //   },
  //   {
  //     path:"assignment.employees",
  //     model: "Employee",
  //     select: "name"
  //   }]
  // }

  console.log("id?", req.params.id);

  Template.findById(req.params.id).populate(templateDepartments)
  // .populate(templatePositions)
  // .populate(templateEmployees)
  .exec().then((result) => {
    return res.json(result);
  }).catch((err) => {
    console.log(err.stack);
    return res.status(500).end();
  });
},

editTemplate(req, res) {
  Template.update({_id: req.params.id}, req.body).then(() => {
    return res.status(200).end();
  }).catch((err) => {
    console.log(err.stack);
    return res.status(500).end();
  });
},

deleteTemplate(req, res) {
  Template.remove({_id: req.params.id}, req.body).then(() => {
    return res.status(200).end();
  }).catch((err) => {
    console.log(err.stack);
    return res.status(500).end();
  });
},

allTemplates(req, res) {
  Template.find().populate('tasks').exec().then((result) => {
    return res.json(result);
  }).catch((err) => {
    console.log(err.stack);
    return res.status(500).end();
  });
}

};
