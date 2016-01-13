const mongoose = require('mongoose');
const Employee = require('../models/Employee.js');
const Company = require('../models/Company');
const Department = require('../models/Department.js');
const Position = require('../models/Position.js');

module.exports = {

  newEmployee(req, res) {
    console.log("POST - ADD EMPLOYEE ENDPOINT", req.body);
    const newEmployee = new Employee(req.body);
    Company
          .findOne({
            _id: req.params.companyid
          })
          .exec()
          .then(function(result) {
            console.log(result);
            result.employees.push(newEmployee._id);
            result.save();
          });
    Department
          .findOne({
            _id: req.params.departmentid
          })
          .exec()
          .then(function(result) {
            console.log(result);
            result.employees.push(newEmployee._id);
            result.save();
          });
    Position
          .findOne({
            _id: req.params.positionid
          })
          .exec()
          .then(function(result) {
            console.log(result);
            result.employees.push(newEmployee._id);
            result.save();
          });
    newEmployee.company = req.params.companyid;
    newEmployee.departments = req.params.departmentid;
    newEmployee.positions = req.params.positionid;
    newEmployee.identification.name.fullName = req.body.identification.name.firstName + " " + req.body.identification.name.lastName;
    newEmployee.save().then((result) => {
      return res.json(result);
    }).catch((err) => {
      return res.status(500).end();
    });
  },

  oneEmployee(req, res) {
    console.log("GET - EMPLOYEE ID: ", req.params.id);
    Employee.findById(req.params.id).exec().then((employee) => {
      return res.json(employee);
    }).catch((err) => {
      return res.status(500).end();
    });
  },

  editEmployee(req, res) {
    console.log("EDIT - EMPLOYEE ID: ", req.params.id);
    Employee.update({
      _id: req.params.id
    }, req.body).then(() => {
      return res.status(200).end();
    }).catch((err) => {
      return res.status(500).end();
    });
  },

  deleteEmployee(req, res) {
    console.log("DELETE - EMPLOYEE ID: ", req.params.id);
    Employee.remove({
      _id: req.params.id
    }, req.body).then(() => {
      return res.status(200).end();
    }).catch((err) => {
      return res.status(500).end();
    });
  },

  allEmployees(req, res) {
    console.log('GET - ALL EMPLOYEES ENDPOINT');
    Company
          .findOne({
            _id: req.params.companyid
          })
          .populate('employees')
          .exec()
          .then(function(result) {
            console.log(result);
            return res.json(result.employees);
          }).catch((err) => {
      return res.status(500).end();
    });
  }

};
