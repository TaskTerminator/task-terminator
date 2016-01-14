const mongoose = require('mongoose');
const Project = require('../models/Project.js');
const Template = require('../models/Template');
const timeCtrl = require('../controllers/timeCtrl');

module.exports = {

  newProject(req, res) {
    Template.findById(req.params.templateid).exec().then((template) => {

      var template_plain = template.toObject();
      delete template_plain._id;
      delete template_plain.__v;

      console.log(template_plain);
        let newProject = new Project(template_plain);
        newProject.description = req.body.description;
        newProject.save().then(() => {
            return res.status(200).end();
        }).catch((err) => {
          console.log("bad dog", err);
            return res.status(500).end();
    }).catch((err) => {
      console.log("badder dog", err);
    });
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
