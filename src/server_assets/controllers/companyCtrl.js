const mongoose = require('mongoose');
const Company = require('../models/Company.js');

module.exports = {

  newCompany(req, res) {
  	const company = new Company(req.body);
  	company.save().then((result) => {
  		return res.json(result);
  	}).catch((err) => {
  		return res.status(500).end();
  	});
  }

};