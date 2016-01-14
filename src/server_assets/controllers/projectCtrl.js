const mongoose = require('mongoose');
const Project = require('../models/Project.js');
const Template = require('../models/Template');
const timeCtrl = require('../controllers/timeCtrl'); 

module.exports = {

  newProject(req, res) {
    Template.findById(req.params.templateid).exec().then((template) => {
        let newProject = new Project();
        newProject = {
            name: template.name,
            description: req.body.description,
            setup: {
                type: template.setup.type,
                frequency: template.setup.frequency,
            },
            interval: {
                type: template.interval.type,
                weeklyInterval: template.interval.weeklyInterval,
                monthlyInterval: {
                    selection: template.interval.monthlyInterval.selection,
                    fromBeginning: template.interval.monthlyInterval.fromBeginning,
                    fromEnd: template.interval.monthlyInterval.fromEnd
                },
                annualInterval: {
                    selection: template.interval.annualInterval.selection,
                    fromBeginning: template.interval.annualInterval.fromBeginning,
                    fromEnd: template.interval.annualInterval.fromEnd
                },
                quarterlyInterval: {
                    selection: template.interval.quarterlyInterval.selection,
                    fromBeginning: template.interval.quarterlyInterval.fromBeginning,
                    fromEnd: template.interval.quarterlyInterval.fromEnd
                },
                semiMonthlyInterval: {
                    selection: template.interval.semiMonthlyInterval.selection,
                    fromBeginning: template.interval.semiMonthlyInterval.fromBeginning,
                    fromEnd: template.interval.semiMonthlyInterval.fromEnd
                },
               
            critical: template.critical
            } 
        };
        newProject.save().then(() => {
            return res.status(200).end();
        }).catch((err) => {
            return res.status(500).end();
    });
    // const project = new Project(req.body);
    // project.save().then((result) => {
    //   return res.json(result);
    // }
    // ).catch((err) => {
    //   return res.status(500).end();
    // }
    // );
  })
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
