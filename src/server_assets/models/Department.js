const mongoose = require("mongoose");

//Departments within the company.
const departmentSchema = new mongoose.Schema({
  name: {type:String, required:true},
  employees: [
        {type:String, ref: 'Employee'}
    ],
  positions: [{type:String, ref: 'Position'}]
});

module.exports = mongoose.model('Department', departmentSchema);
