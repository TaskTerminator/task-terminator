const mongoose = require("mongoose");

// Position/role employees have at the company.
const positionSchema = new mongoose.Schema({
  name: {type:String, required:true},
  employees: [
        {type:String, ref:'Employee'}
      ],
  department: {type:String, ref: 'Department'},
  company: {type:String, ref: 'Company'}
});

module.exports = mongoose.model('Position', positionSchema);
