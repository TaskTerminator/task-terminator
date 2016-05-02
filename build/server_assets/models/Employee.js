'use strict';

var mongoose = require('mongoose');

//Users are all employees of the company. NOTE: Not all users will actually have login access to the UI.
var employeeSchema = new mongoose.Schema({
  //Employee name information
  identification: {
    name: {
      firstName: { type: String },
      lastName: { type: String },
      fullName: { type: String }
    },
    //Employee's username for Authentication, reports, etc in the UI. Only for employee's who would be starting projects.
    userName: { type: String },
    // slackHandle: {type: String},
    email: { type: String }
  },
  //We need to store some auth info here... will wait to find out exactly what
  // googleId: {}
  //This determines whether an employee has access. True = access to UI.
  permissions: {
    admin: { type: Boolean, default: false }
  },
  company: { type: String, ref: 'Company' },
  positions: [{ type: String, ref: 'Position' }],
  departments: [{ type: String, ref: 'Department' }]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZlcl9hc3NldHMvbW9kZWxzL0VtcGxveWVlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBTSxRQUFRLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQzs7O0FBQUMsQUFHckMsSUFBTSxjQUFjLEdBQUcsSUFBSSxRQUFRLENBQUMsTUFBTSxDQUFDOztBQUV6QyxnQkFBYyxFQUFFO0FBQ2QsUUFBSSxFQUFFO0FBQ0osZUFBUyxFQUFFLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBQztBQUN6QixjQUFRLEVBQUUsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFDO0FBQ3hCLGNBQVEsRUFBRSxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUM7S0FDekI7O0FBRUQsWUFBUSxFQUFFLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBQzs7QUFFeEIsU0FBSyxFQUFFLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBQztHQUd0Qjs7OztBQUVELGFBQVcsRUFBRTtBQUNYLFNBQUssRUFBRSxFQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBQztHQUN2QztBQUNELFNBQU8sRUFBRSxFQUFDLElBQUksRUFBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBQztBQUN0QyxXQUFTLEVBQUMsQ0FBQyxFQUFDLElBQUksRUFBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLFVBQVUsRUFBQyxDQUFDO0FBQzFDLGFBQVcsRUFBRSxDQUFDLEVBQUMsSUFBSSxFQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsWUFBWSxFQUFDLENBQUM7Q0FDaEQsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUMsQUEyQkgsTUFBTSxDQUFDLE9BQU8sR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFBRSxjQUFjLENBQUMsQ0FBQyIsImZpbGUiOiJzZXJ2ZXJfYXNzZXRzL21vZGVscy9FbXBsb3llZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IG1vbmdvb3NlID0gcmVxdWlyZSgnbW9uZ29vc2UnKTtcblxuLy9Vc2VycyBhcmUgYWxsIGVtcGxveWVlcyBvZiB0aGUgY29tcGFueS4gTk9URTogTm90IGFsbCB1c2VycyB3aWxsIGFjdHVhbGx5IGhhdmUgbG9naW4gYWNjZXNzIHRvIHRoZSBVSS5cbmNvbnN0IGVtcGxveWVlU2NoZW1hID0gbmV3IG1vbmdvb3NlLlNjaGVtYSh7XG4gIC8vRW1wbG95ZWUgbmFtZSBpbmZvcm1hdGlvblxuICBpZGVudGlmaWNhdGlvbjoge1xuICAgIG5hbWU6IHtcbiAgICAgIGZpcnN0TmFtZToge3R5cGU6IFN0cmluZ30sXG4gICAgICBsYXN0TmFtZToge3R5cGU6IFN0cmluZ30sXG4gICAgICBmdWxsTmFtZToge3R5cGU6IFN0cmluZ31cbiAgICB9LFxuICAgIC8vRW1wbG95ZWUncyB1c2VybmFtZSBmb3IgQXV0aGVudGljYXRpb24sIHJlcG9ydHMsIGV0YyBpbiB0aGUgVUkuIE9ubHkgZm9yIGVtcGxveWVlJ3Mgd2hvIHdvdWxkIGJlIHN0YXJ0aW5nIHByb2plY3RzLlxuICAgIHVzZXJOYW1lOiB7dHlwZTogU3RyaW5nfSxcbiAgICAvLyBzbGFja0hhbmRsZToge3R5cGU6IFN0cmluZ30sXG4gICAgZW1haWw6IHt0eXBlOiBTdHJpbmd9LFxuICAgIC8vV2UgbmVlZCB0byBzdG9yZSBzb21lIGF1dGggaW5mbyBoZXJlLi4uIHdpbGwgd2FpdCB0byBmaW5kIG91dCBleGFjdGx5IHdoYXRcbiAgICAvLyBnb29nbGVJZDoge31cbiAgfSxcbiAgLy9UaGlzIGRldGVybWluZXMgd2hldGhlciBhbiBlbXBsb3llZSBoYXMgYWNjZXNzLiBUcnVlID0gYWNjZXNzIHRvIFVJLlxuICBwZXJtaXNzaW9uczoge1xuICAgIGFkbWluOiB7dHlwZTogQm9vbGVhbiwgZGVmYXVsdDogZmFsc2V9XG4gIH0sXG4gIGNvbXBhbnk6IHt0eXBlOlN0cmluZywgcmVmOiAnQ29tcGFueSd9LFxuICBwb3NpdGlvbnM6W3t0eXBlOlN0cmluZywgcmVmOiAnUG9zaXRpb24nfV0sXG4gIGRlcGFydG1lbnRzOiBbe3R5cGU6U3RyaW5nLCByZWY6ICdEZXBhcnRtZW50J31dLFxufSk7XG5cbi8vVGhpcyBpcyBmb3IgbG9jYWwgQXV0aCBpZiB3ZSB3YW50IHRvIHVzZSBzYWlkIGF1dGhlbnRpY2F0aW9uIHR5cGUuXG5cbi8vIGVtcGxveWVlU2NoZW1hLm1ldGhvZHMudmVyaWZ5UGFzc3dvcmQgPSBmdW5jdGlvbihnaXZlblBhc3N3b3JkKSB7XG4vLyBcdHZhciBkZWZlcnJlZCA9IHEuZGVmZXIoKTtcbi8vIFx0YmNyeXB0LmNvbXBhcmUoZ2l2ZW5QYXNzd29yZCwgdGhpcy5wYXNzd29yZCwgZnVuY3Rpb24oZXJyLCByZXN1bHQpIHtcbi8vIFx0XHRpZiAocmVzdWx0KSB7XG4vLyBcdFx0XHRkZWZlcnJlZC5yZXNvbHZlKHRydWUpO1xuLy8gXHRcdH1cbi8vIFx0XHRlbHNlIHtcbi8vIFx0XHRcdGRlZmVycmVkLnJlamVjdChmYWxzZSk7XG4vLyBcdFx0fVxuLy8gXHR9KTtcbi8vIFx0cmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG4vLyB9O1xuXG4vLyBlbXBsb3llZVNjaGVtYS5wcmUoJ3NhdmUnLCBmdW5jdGlvbihuZXh0KSB7XG4vLyBcdHZhciB1c2VyID0gdGhpcztcbi8vIFx0YmNyeXB0LmdlblNhbHQoMTIsIGZ1bmN0aW9uKGVyciwgcmVzdWx0KSB7XG4vLyBcdFx0YmNyeXB0Lmhhc2godXNlci5wYXNzd29yZCwgcmVzdWx0LCBmdW5jdGlvbihlcnIsIGhhc2gpIHtcbi8vIFx0XHRcdHVzZXIucGFzc3dvcmQgPSBoYXNoO1xuLy8gXHRcdFx0bmV4dCgpO1xuLy8gXHRcdH0pXG4vLyBcdH0pO1xuLy8gfSk7XG5cbm1vZHVsZS5leHBvcnRzID0gbW9uZ29vc2UubW9kZWwoJ0VtcGxveWVlJywgZW1wbG95ZWVTY2hlbWEpO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
