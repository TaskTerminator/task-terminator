const mongoose = require('mongoose');
const Template = require('../models/Template.js');

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
  Template.findById(req.params.id).exec().then((result) => {
    return res.json(result);
  }).catch((err) => {
    return res.status(500).end();
  });
},

editTemplate(req, res) {
  Template.update({_id: req.params.id}, req.body).then(() => {
    return res.status(200).end();
  }).catch((err) => {
    return res.status(500).end();
  });
},

deleteTemplate(req, res) {
  Template.remove({_id: req.params.id}, req.body).then(() => {
    return res.status(200).end();
  }).catch((err) => {
    return res.status(500).end();
  });
},

allTemplates(req, res) {
  Template.find().exec().then((result) => {
    return res.json(result);
  }).catch((err) => {
    return res.status(500).end();
  });
}

};
