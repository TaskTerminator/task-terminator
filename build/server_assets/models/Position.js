'use strict';

var mongoose = require("mongoose");

// Position/role employees have at the company.
var positionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  employees: [{ type: String, ref: 'Employee' }]
});

module.exports = mongoose.model('Position', positionSchema);