const mongoose = require('mongoose');
const moment = require('moment');

const templateTaskSchema = new mongoose.Schema({
  name: {type: String, required: true},
  description: {type: String},
  associatedTemplate: {type:String, ref:'Template'},
  date: {
    created: {type: Date, default: moment()},
    deadline: {type: Date}
  },
  assignment: {
      departments: {type:String, ref: 'Department'},
      positions: {type:String, ref: 'Position'},
      employees: {type:String, ref: 'Employee'}
  },
  status : {type: String, enum: ['Incomplete', 'Complete'], default: 'Incomplete'}
});

module.exports = mongoose.model('TemplateTask', templateTaskSchema);
