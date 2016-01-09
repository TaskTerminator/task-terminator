const mongoose = require('mongoose');

const templateTaskSchema = new mongoose.Schema({
  name: {type: String, required: true},
  description: {type: String},
  associatedProject : {type:String, ref:'Project'},
  date: {
    created: {type: Date, default: new Date()},
    deadline: {type: Date},
  },
  assigment: {
      departments: {type:String, ref: 'Department'},
      positions: {type:String, ref: 'Position'},
      employees: {type:String, ref: 'Employee'}
  }
});

module.exports = mongoose.model('TemplateTask', templateTaskSchema);
