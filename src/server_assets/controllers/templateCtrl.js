const mongoose = require('mongoose');
const Template = require('../models/Template.js');

module.exports = {

newTemplate: function(req,res){
  console.log("POST - ADD TEMPLATE ENDPOINT");
  return res.status(200).end();
},

oneTemplate: function(req,res){
  console.log("GET - TEMPLATE ID: ", req.params.id);
  return res.status(200).end();
},

editTemplate: function(req,res){
  console.log("EDIT - TEMPLATE ID: ", req.params.id);
  return res.status(200).end();
},

deleteTemplate: function(req,res){
  console.log("DELETE - TEMPLATE ID: ", req.params.id);
  return res.status(200).end();
},

allTemplates: function(req,res){
  console.log("GET ALL TEMPLATES ENDPOINT");
  return res.status(200).end();
}

};
