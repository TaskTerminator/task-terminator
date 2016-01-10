const mongoose = require('mongoose');
const Template = require('../models/Template.js');

module.exports = {

newTemplate: function(req,res){
  console.log("POST - ADD TEMPLATE ENDPOINT");
  return res.status(200).end();
}

};
