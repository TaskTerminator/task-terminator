const mongoose = require('mongoose');
const Project = require('../models/Project.js');
const Template = require('../models/Template');
const timeCtrl = require('../timeCtrl'); 

module.exports = {

  newProject(req, res) {
    const project = new Project(req.body);
    project.save().then((result) => {
      return res.json(result);
    }).catch((err) => {
      return res.status(500).end();
    });
  },

  oneProject(req, res) {
    Project.findById(req.params.id).exec().then((result) => {
      return res.json(result);
    }).catch((err) => {
      return res.status(500).end();
    });
  },

  editProject(req, res) {
    Project.update({_id: req.params.id}, req.body).then(() => {
      return res.status(200).end();
    }).catch((err) => {
      return res.status(500).end();
    });
  },

  deleteProject(req, res) {
    Project.remove({_id: req.params.id}, req.body).then(() => {
      return res.status(200).end();
    }).catch((err) => {
      return res.status(500).end();
    });
  },


  allProjects(req, res) {
    Project.find().exec().then((result) => {
      return res.json(result);
    }).catch((err) => {
      return res.status(500).end();
    });
  }

};
