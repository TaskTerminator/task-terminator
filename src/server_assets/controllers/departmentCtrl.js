const mongoose = require('mongoose');
const Department = require('../models/Department.js');

module.exports = {

newDepartment: function(req,res){
  console.log("POST - ADD DEPARTMENT ENDPOINT");
  return res.status(200).end();
}

};
