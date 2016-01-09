var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var q = require('q');

//Users are all employees of the company. NOTE: Not all users will actually have login access to the UI.
var employeeSchema = mongoose.Schema({
  //Employee name information
  identification: {
    name: {
      firstName: {type: String},
      lastName: {type: String},
      fullName: {type: String}
    },
    //Employee's username for Authentication, reports, etc in the UI. Only for employee's who would be starting projects.
    userName: {type: String},
    //Slack handle to tie to the slack bot commands.
    slackHandle: {type: String},
    email: {type: String},
    googleId: {}
  },
  //This determines whether an employee has access. True = access to UI.
  permissions: {
    admin: {type: Boolean, default: false}
  },
  positions:[{type:String, ref: 'Position'}],
  departments: [{type:String, ref: 'Department'}],
}));

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

