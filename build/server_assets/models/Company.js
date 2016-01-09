'use strict';

var mongoose = require("mongoose");

var companySchema = new mongoose.Schema({
  name: { type: String, required: true },
  //Availability indicates days and hours of operations for the company. This will affect the timeline of deadlines, etc.
  availability: {
    days: [{ type: String, enum: allowedDays, required: true }],
    hourOpen: { type: Number },
    hourClosed: { type: Number }
  },
  //The below three reference to the specific departments, positions, and employees within the company.
  departments: [{ type: String, ref: 'Department' }],
  positions: [{ type: String, ref: 'Position' }],
  employees: [{ type: String, ref: 'Employee' }],
  //Company-related slack information for tying the slack bot commands to the company's slack domain.
  slack: {
    team_id: { type: String },
    team_domain: { type: String },
    channels: [{
      channel_id: { type: String },
      channel_name: { type: String }
    }]
  }
});

module.exports = mongoose.model('Company', companySchema);