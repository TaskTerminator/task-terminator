const mongoose = require('mongoose');

//Model of tasks tied to active projects. References department, position, and individual
const projectTaskSchema = new mongoose.Schema({
  name: {type: String, required: true},
  friendlyId: {type: String, unique: true},
  description: {type:String},
  status: {type: String, enum: ['Incomplete', 'Complete'], default: 'Incomplete'},
  associatedProject : {type:String, ref:'Project'},
  date: {
    created: {type: Date, default: new Date()},
    deadline: {type: Date},
  },
  assignment: {
      departments: {type:String, ref: 'Department'},
      positions: {type:String, ref: 'Position'},
      employees: {type:String, ref: 'Employee'}
  }
});

module.exports = mongoose.model('ProjectTask', projectTaskSchema);
