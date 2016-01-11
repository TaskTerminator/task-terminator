const mongoose = require('mongoose');
const Department = require('../models/Department.js');

module.exports = {

  newDepartment: function(req, res) {
    console.log("POST - ADD DEPARTMENT ENDPOINT", req.body);
    const newDepartment = new Department(req.body);
    newDepartment.save().then((result) => {
      return res.json(result);
    }).catch((err) => {
      return res.status(500).end();
    });
  },

  oneDepartment: function(req,res){
    console.log("GET - DEPARTMENT ID: ", req.params.id);
    Department.findById(req.params.id).exec().then((department) => {
      return res.json(department);
    }).catch((err) => {
      return res.status(500).end();
    });
  },

  editDepartment: function(req,res){
    console.log("PUT - EDIT DEPARTMENT ID: ", req.params.id);
    Department.update({_id: req.params.id}, req.body).then(() => {
      return res.status(200).end();
    }).catch((err) => {
      return res.status(500).end();
    });
  },

  deleteDepartment: function(req,res){
    console.log('DELETE - DEPARTMENT ID: ', req.params.id);
    Department.remove({_id: req.params.id}, req.body).then(() => {
      return res.status(200).end();
    }).catch((err) => {
      return res.status(500).end();
    });
  },

  allDepartments: function(req, res) {
    console.log('GET - ALL DEPARTMENTS ENDPOINT');
    Department.find().exec().then((departments) => {
      return res.json(departments);
    }).catch((err) => {
      console.log(err);
      return res.status(500).end();
    });
  }

};
