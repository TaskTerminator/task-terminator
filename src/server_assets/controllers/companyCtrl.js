const mongoose = require('mongoose');
const Department = require('../models/Department.js');



module.exports = {

  newCompany: function(req, res) {
    console.log("POST - ADD COMPANY ENDPOINT");
    return res.status(200).end();
  }


};