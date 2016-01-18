const mongoose = require('mongoose');
const Company = require('../models/Company.js');

module.exports = {

	allCompanies(req, res) {
		Company.find()
		.populate('departments')
		.populate('positions')
		.populate('employees')
		.exec()
		.then((result) => {
			return res.json(result);
		}).catch((err) => {
			console.log(err);
			return res.status(500).end();
		});
	},

	newCompany(req, res) {
		const company = new Company(req.body);
		company.save().then((result) => {
			return res.json(result);
		}).catch((err) => {
			return res.status(500).end();
		});
	}

};
