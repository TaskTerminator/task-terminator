const mongoose = require('mongoose');

//Users are all employees of the company. NOTE: Not all users will actually have login access to the UI.
const employeeSchema = new mongoose.Schema({
  //Employee name information
  identification: {
    name: {
      firstName: {type: String},
      lastName: {type: String},
      fullName: {type: String}
    },
    //Employee's username for Authentication, reports, etc in the UI. Only for employee's who would be starting projects.
    userName: {type: String},
    // slackHandle: {type: String},
    email: {type: String},
    //We need to store some auth info here... will wait to find out exactly what
    // googleId: {}
  },
  //This determines whether an employee has access. True = access to UI.
  permissions: {
    admin: {type: Boolean, default: false}
  },
  company: {type:String, ref: 'Company'},
  positions:[{type:String, ref: 'Position'}],
  departments: [{type:String, ref: 'Department'}],
});

//This is for local Auth if we want to use said authentication type.

// employeeSchema.methods.verifyPassword = function(givenPassword) {
// 	var deferred = q.defer();
// 	bcrypt.compare(givenPassword, this.password, function(err, result) {
// 		if (result) {
// 			deferred.resolve(true);
// 		}
// 		else {
// 			deferred.reject(false);
// 		}
// 	});
// 	return deferred.promise;
// };

// employeeSchema.pre('save', function(next) {
// 	var user = this;
// 	bcrypt.genSalt(12, function(err, result) {
// 		bcrypt.hash(user.password, result, function(err, hash) {
// 			user.password = hash;
// 			next();
// 		})
// 	});
// });

module.exports = mongoose.model('Employee', employeeSchema);
