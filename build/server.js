'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var mongoose = require('mongoose');
//const session = require('express-session');
//const passport = require('passport');
// const FacebookStrategy = require('passport-facebook').Strategy;
// const secret = require("./secret");
// const bcrypt = require('bcrypt-nodejs');

var app = express();
var port = process.env.PORT || 8000;

//require('./server_assets/cron/test').start();

//********** CONTROLLERS **********
var companyCtrl = require('./server_assets/controllers/companyCtrl.js');
var departmentCtrl = require('./server_assets/controllers/departmentCtrl.js');
var employeeCtrl = require('./server_assets/controllers/employeeCtrl.js');
var positionCtrl = require('./server_assets/controllers/positionCtrl.js');
var projectCtrl = require('./server_assets/controllers/projectCtrl.js');
var projectTaskCtrl = require('./server_assets/controllers/projectTaskCtrl.js');
var templateCtrl = require('./server_assets/controllers/templateCtrl.js');
var templateTaskCtrl = require('./server_assets/controllers/templateTaskCtrl.js');
var slackCtrl = require('./server_assets/controllers/slackCtrl.js');
var testTimeCtrl = require('./server_assets/controllers/testTimeCtrl.js');

mongoose.Promise = require('q').Promise;

//----------Middleware------------//
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(__dirname + '/public'));
app.listen(port, function () {
  console.log("Listening on port: " + port);
});

//********** COMPANY ENDPOINTS **********
app.post('/api/company', companyCtrl.newCompany);
app.get('/api/company', companyCtrl.allCompanies);
app.get('/api/company/:id', companyCtrl.getOneCompany);

//********** DEPARTMENT ENDPOINTS **********
app.get('/api/department/:id', departmentCtrl.oneDepartment);
app.put('/api/department/:id', departmentCtrl.editDepartment);
app.delete('/api/department/:id', departmentCtrl.deleteDepartment);
app.post('/api/department/:companyid', departmentCtrl.newDepartment);

app.get('/api/department', departmentCtrl.allDepartments);

//********** EMPLOYEE ENDPOINTS **********
app.get('/api/employee/:id', employeeCtrl.oneEmployee);
app.put('/api/employee/:id', employeeCtrl.editEmployee);
app.delete('/api/employee/:id', employeeCtrl.deleteEmployee);
app.post('/api/:companyid/:departmentid/:positionid/employee', employeeCtrl.newEmployee);
app.get('/api/:companyid/employee', employeeCtrl.allEmployees);

//********** POSITION ENDPOINTS **********
app.get('/api/position/:id', positionCtrl.onePosition);
app.put('/api/position/:id', positionCtrl.editPosition);
app.delete('/api/position/:id', positionCtrl.deletePosition);
app.post('/api/position/:companyid/:departmentid', positionCtrl.newPosition);
app.get('/api/position', positionCtrl.allPositions);

//********** PROJECT ENDPOINTS **********
app.get('/api/project/:id', projectCtrl.oneProject);
app.put('/api/project/:id', projectCtrl.editProject);
app.delete('/api/project/:id', projectCtrl.deleteProject);
app.post('/api/project/:templateid', projectCtrl.endpointProject);
app.get('/api/project', projectCtrl.allProjects);

//********** PROJECT TASK ENDPOINTS **********
app.get('/api/tasks/project/:id', projectTaskCtrl.getTasks);
app.post('/api/tasks/project/:projectid', projectTaskCtrl.addTask);
app.put('/api/tasks/project/:projectid', projectTaskCtrl.editTask);
// * app.get('/api/tasks/department/:id', projectTaskCtrl.getDepartmentTask);

//********** TEMPLATE ENDPOINTS **********
app.get('/api/template/:id', templateCtrl.oneTemplate);
app.put('/api/template/:id', templateCtrl.editTemplate);
app.delete('/api/template/:id', templateCtrl.deleteTemplate);
app.post('/api/template', templateCtrl.newTemplate);
app.get('/api/template', templateCtrl.allTemplates);

//********** TEMPLATE TASK ENDPOINTS **********
app.get('/api/tasks/template', templateTaskCtrl.getAllTasks);
app.post('/api/:templateid/tasks', templateTaskCtrl.addTask);
app.get('/api/tasks/template/:id', templateTaskCtrl.getTasks);

//********** TIME ENDPOINTS **********
app.get('/api/time', testTimeCtrl.testTime);

//********** SINGLE PROJECT ENDPOINTS **********
app.post('/api/singleproject', projectCtrl.newSingleProject);

//********** TRIGGERED PROJECT ENDPOINTS **********
app.post('/api/triggeredproject/:templateid', projectCtrl.newTriggeredProject);

//-----------Connection to database-----------//
mongoose.connect('mongodb://taskterminator:devmountain@ds039175.mongolab.com:39175/taskterminator');
//const connection =  mongoose.connect('mongodb://localhost/terminator');
mongoose.connection.once('connected', function () {
  console.log('connected to db');
});

//-----------Passport Facebook Authentication-----------//
//app.use(session({
//    secret: "s0m3th1n",
//    resave: false,
//    saveUninitialized: false,
//}));
// app.use(passport.initialize());
// app.use(passport.session());
//
// passport.use(new FacebookStrategy({
//     clientID: secret.fb.clientID,
//     clientSecret: secret.fb.clientSecret,
//     callbackURL: "http://localhost:"+port+"/api/auth/callback",
//     profileFields: ['id', 'email', 'gender', 'link', 'locale', 'name', 'timezone', 'updated_time', 'verified']
//     },  function(accessToken, refreshToken, profile, done) {
//   	    	process.nextTick(function(){
//   	    		User.findOne({'facebook.id': profile.id}, function(err, user){
//   	    			if(err)
//   	    				return done(err);
//   	    			if(user)
//   	    				return done(null, user);
//   	    			else {
//   	    				var newUser = new User();
//   	    				newUser.facebook.id = profile.id;
//   	    				newUser.facebook.token = accessToken;
//   	    				newUser.facebook.name = profile._json.first_name + " " + profile._json.last_name;
//                 newUser.facebook.email = profile._json.email;
//
//   	    				newUser.save(function(err){
//   	    					if(err)
//   	    						throw err;
//   	    					return done(null, newUser);
//   	    				})
//   	    				console.log(user);
//   	    			}
//   	    		});
//   	    	});
//   	    }
//
// ));

//-----------Passport Local Authentication-----------//

// passport.use(new LocalStrategy(
//   function(username, password, done) {
//     User.findOne({ username: username }, function (err, user) {
//       if (err) {
//         return done(err);
//       }
//       if (!user) {
//         return done(null, false);
//       }
//       if (!user.verifyPassword(password)) {
//         return done(null, false);
//       }
//
//       return done(null, user);
//     });
//   }
// ));

//---------------------------------------------------//

// var requireAuth = function(req, res, next) {
//   if (!req.isAuthenticated()) {
//     res.redirect('/#/login');
//   }
//   else { next(); }
// };

// app.get("/api/auth/", passport.authenticate("facebook"));
// app.get("/api/auth/callback", passport.authenticate("facebook", {
//     successRedirect: "/#/user/dashboard",
//     failureRedirect: "/#/login"
// }));
//
// passport.serializeUser(function(user, done){
//     done(null, user);
// });
// passport.deserializeUser(function(obj, done){
//     done(null, obj);
// });
//
// app.get("/me", requireAuth, function(req, res){
//     res.json(req.user);
// });
//
// app.get("/checklogged", function(req, res){
//     res.send(req.isAuthenticated() ? req.user : '0');
// });
//
// app.get('/logout',function(req, res) {
//   req.logout();
//   res.redirect('/#/login');
// })
//# sourceMappingURL=data:application/json;base64,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VyxDQUFDLG1CQUFtQixDQUFDOzs7QUFBQyxBQUcvRSxRQUFRLENBQUMsT0FBTyxDQUFDLGlGQUFpRixDQUFDOztBQUFDLEFBRXBHLFFBQVEsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxZQUFXO0FBQy9DLFNBQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsQ0FBQztDQUNoQyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUMiLCJmaWxlIjoic2VydmVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgZXhwcmVzcyA9IHJlcXVpcmUoJ2V4cHJlc3MnKTtcbmNvbnN0IGJvZHlQYXJzZXIgPSByZXF1aXJlKCdib2R5LXBhcnNlcicpO1xuY29uc3QgY29ycyA9IHJlcXVpcmUoJ2NvcnMnKTtcbmNvbnN0IG1vbmdvb3NlID0gcmVxdWlyZSgnbW9uZ29vc2UnKTtcbi8vY29uc3Qgc2Vzc2lvbiA9IHJlcXVpcmUoJ2V4cHJlc3Mtc2Vzc2lvbicpO1xuLy9jb25zdCBwYXNzcG9ydCA9IHJlcXVpcmUoJ3Bhc3Nwb3J0Jyk7XG4vLyBjb25zdCBGYWNlYm9va1N0cmF0ZWd5ID0gcmVxdWlyZSgncGFzc3BvcnQtZmFjZWJvb2snKS5TdHJhdGVneTtcbi8vIGNvbnN0IHNlY3JldCA9IHJlcXVpcmUoXCIuL3NlY3JldFwiKTtcbi8vIGNvbnN0IGJjcnlwdCA9IHJlcXVpcmUoJ2JjcnlwdC1ub2RlanMnKTtcblxuY29uc3QgYXBwID0gZXhwcmVzcygpO1xuY29uc3QgcG9ydCA9IHByb2Nlc3MuZW52LlBPUlQgfHwgODAwMDtcblxuLy9yZXF1aXJlKCcuL3NlcnZlcl9hc3NldHMvY3Jvbi90ZXN0Jykuc3RhcnQoKTtcblxuXG4vLyoqKioqKioqKiogQ09OVFJPTExFUlMgKioqKioqKioqKlxuY29uc3QgY29tcGFueUN0cmwgPSByZXF1aXJlKCcuL3NlcnZlcl9hc3NldHMvY29udHJvbGxlcnMvY29tcGFueUN0cmwuanMnKTtcbmNvbnN0IGRlcGFydG1lbnRDdHJsID0gcmVxdWlyZSgnLi9zZXJ2ZXJfYXNzZXRzL2NvbnRyb2xsZXJzL2RlcGFydG1lbnRDdHJsLmpzJyk7XG5jb25zdCBlbXBsb3llZUN0cmwgPSByZXF1aXJlKCcuL3NlcnZlcl9hc3NldHMvY29udHJvbGxlcnMvZW1wbG95ZWVDdHJsLmpzJyk7XG5jb25zdCBwb3NpdGlvbkN0cmwgPSByZXF1aXJlKCcuL3NlcnZlcl9hc3NldHMvY29udHJvbGxlcnMvcG9zaXRpb25DdHJsLmpzJyk7XG5jb25zdCBwcm9qZWN0Q3RybCA9IHJlcXVpcmUoJy4vc2VydmVyX2Fzc2V0cy9jb250cm9sbGVycy9wcm9qZWN0Q3RybC5qcycpO1xuY29uc3QgcHJvamVjdFRhc2tDdHJsID0gcmVxdWlyZSgnLi9zZXJ2ZXJfYXNzZXRzL2NvbnRyb2xsZXJzL3Byb2plY3RUYXNrQ3RybC5qcycpO1xuY29uc3QgdGVtcGxhdGVDdHJsID0gcmVxdWlyZSgnLi9zZXJ2ZXJfYXNzZXRzL2NvbnRyb2xsZXJzL3RlbXBsYXRlQ3RybC5qcycpO1xuY29uc3QgdGVtcGxhdGVUYXNrQ3RybCA9IHJlcXVpcmUoJy4vc2VydmVyX2Fzc2V0cy9jb250cm9sbGVycy90ZW1wbGF0ZVRhc2tDdHJsLmpzJyk7XG5jb25zdCBzbGFja0N0cmwgPSByZXF1aXJlKCcuL3NlcnZlcl9hc3NldHMvY29udHJvbGxlcnMvc2xhY2tDdHJsLmpzJyk7XG5jb25zdCB0ZXN0VGltZUN0cmwgPSByZXF1aXJlKCcuL3NlcnZlcl9hc3NldHMvY29udHJvbGxlcnMvdGVzdFRpbWVDdHJsLmpzJyk7XG5cbm1vbmdvb3NlLlByb21pc2UgPSByZXF1aXJlKCdxJykuUHJvbWlzZTtcblxuLy8tLS0tLS0tLS0tTWlkZGxld2FyZS0tLS0tLS0tLS0tLS8vXG5hcHAudXNlKGJvZHlQYXJzZXIudXJsZW5jb2RlZCh7ZXh0ZW5kZWQ6ZmFsc2V9KSk7XG5hcHAudXNlKGJvZHlQYXJzZXIuanNvbigpKTtcbmFwcC51c2UoY29ycygpKTtcbmFwcC51c2UoZXhwcmVzcy5zdGF0aWMoX19kaXJuYW1lKycvcHVibGljJykpO1xuYXBwLmxpc3Rlbihwb3J0LCBmdW5jdGlvbiAoKSB7XG4gIGNvbnNvbGUubG9nKFwiTGlzdGVuaW5nIG9uIHBvcnQ6IFwiICsgcG9ydCk7XG59KTtcblxuLy8qKioqKioqKioqIENPTVBBTlkgRU5EUE9JTlRTICoqKioqKioqKipcbmFwcC5wb3N0KCcvYXBpL2NvbXBhbnknLCBjb21wYW55Q3RybC5uZXdDb21wYW55KTtcbmFwcC5nZXQoJy9hcGkvY29tcGFueScsIGNvbXBhbnlDdHJsLmFsbENvbXBhbmllcyk7XG5hcHAuZ2V0KCcvYXBpL2NvbXBhbnkvOmlkJywgY29tcGFueUN0cmwuZ2V0T25lQ29tcGFueSk7XG5cbi8vKioqKioqKioqKiBERVBBUlRNRU5UIEVORFBPSU5UUyAqKioqKioqKioqXG5hcHAuZ2V0KCcvYXBpL2RlcGFydG1lbnQvOmlkJywgZGVwYXJ0bWVudEN0cmwub25lRGVwYXJ0bWVudCk7XG5hcHAucHV0KCcvYXBpL2RlcGFydG1lbnQvOmlkJywgZGVwYXJ0bWVudEN0cmwuZWRpdERlcGFydG1lbnQpO1xuYXBwLmRlbGV0ZSgnL2FwaS9kZXBhcnRtZW50LzppZCcsIGRlcGFydG1lbnRDdHJsLmRlbGV0ZURlcGFydG1lbnQpO1xuYXBwLnBvc3QoJy9hcGkvZGVwYXJ0bWVudC86Y29tcGFueWlkJywgZGVwYXJ0bWVudEN0cmwubmV3RGVwYXJ0bWVudCk7XG5cbmFwcC5nZXQoJy9hcGkvZGVwYXJ0bWVudCcsIGRlcGFydG1lbnRDdHJsLmFsbERlcGFydG1lbnRzKTtcblxuXG4vLyoqKioqKioqKiogRU1QTE9ZRUUgRU5EUE9JTlRTICoqKioqKioqKipcbmFwcC5nZXQoJy9hcGkvZW1wbG95ZWUvOmlkJywgZW1wbG95ZWVDdHJsLm9uZUVtcGxveWVlKTtcbmFwcC5wdXQoJy9hcGkvZW1wbG95ZWUvOmlkJywgZW1wbG95ZWVDdHJsLmVkaXRFbXBsb3llZSk7XG5hcHAuZGVsZXRlKCcvYXBpL2VtcGxveWVlLzppZCcsIGVtcGxveWVlQ3RybC5kZWxldGVFbXBsb3llZSk7XG5hcHAucG9zdCgnL2FwaS86Y29tcGFueWlkLzpkZXBhcnRtZW50aWQvOnBvc2l0aW9uaWQvZW1wbG95ZWUnLCBlbXBsb3llZUN0cmwubmV3RW1wbG95ZWUpO1xuYXBwLmdldCgnL2FwaS86Y29tcGFueWlkL2VtcGxveWVlJywgZW1wbG95ZWVDdHJsLmFsbEVtcGxveWVlcyk7XG5cblxuLy8qKioqKioqKioqIFBPU0lUSU9OIEVORFBPSU5UUyAqKioqKioqKioqXG5hcHAuZ2V0KCcvYXBpL3Bvc2l0aW9uLzppZCcsIHBvc2l0aW9uQ3RybC5vbmVQb3NpdGlvbik7XG5hcHAucHV0KCcvYXBpL3Bvc2l0aW9uLzppZCcsIHBvc2l0aW9uQ3RybC5lZGl0UG9zaXRpb24pO1xuYXBwLmRlbGV0ZSgnL2FwaS9wb3NpdGlvbi86aWQnLCBwb3NpdGlvbkN0cmwuZGVsZXRlUG9zaXRpb24pO1xuYXBwLnBvc3QoJy9hcGkvcG9zaXRpb24vOmNvbXBhbnlpZC86ZGVwYXJ0bWVudGlkJywgcG9zaXRpb25DdHJsLm5ld1Bvc2l0aW9uKTtcbmFwcC5nZXQoJy9hcGkvcG9zaXRpb24nLCBwb3NpdGlvbkN0cmwuYWxsUG9zaXRpb25zKTtcblxuLy8qKioqKioqKioqIFBST0pFQ1QgRU5EUE9JTlRTICoqKioqKioqKipcbmFwcC5nZXQoJy9hcGkvcHJvamVjdC86aWQnLCBwcm9qZWN0Q3RybC5vbmVQcm9qZWN0KTtcbmFwcC5wdXQoJy9hcGkvcHJvamVjdC86aWQnLCBwcm9qZWN0Q3RybC5lZGl0UHJvamVjdCk7XG5hcHAuZGVsZXRlKCcvYXBpL3Byb2plY3QvOmlkJywgcHJvamVjdEN0cmwuZGVsZXRlUHJvamVjdCk7XG5hcHAucG9zdCgnL2FwaS9wcm9qZWN0Lzp0ZW1wbGF0ZWlkJywgcHJvamVjdEN0cmwuZW5kcG9pbnRQcm9qZWN0KTtcbmFwcC5nZXQoJy9hcGkvcHJvamVjdCcsIHByb2plY3RDdHJsLmFsbFByb2plY3RzKTtcblxuLy8qKioqKioqKioqIFBST0pFQ1QgVEFTSyBFTkRQT0lOVFMgKioqKioqKioqKlxuYXBwLmdldCgnL2FwaS90YXNrcy9wcm9qZWN0LzppZCcsIHByb2plY3RUYXNrQ3RybC5nZXRUYXNrcyk7XG5hcHAucG9zdCgnL2FwaS90YXNrcy9wcm9qZWN0Lzpwcm9qZWN0aWQnLCBwcm9qZWN0VGFza0N0cmwuYWRkVGFzayk7XG5hcHAucHV0KCcvYXBpL3Rhc2tzL3Byb2plY3QvOnByb2plY3RpZCcsIHByb2plY3RUYXNrQ3RybC5lZGl0VGFzayk7XG4vLyAqIGFwcC5nZXQoJy9hcGkvdGFza3MvZGVwYXJ0bWVudC86aWQnLCBwcm9qZWN0VGFza0N0cmwuZ2V0RGVwYXJ0bWVudFRhc2spO1xuXG4vLyoqKioqKioqKiogVEVNUExBVEUgRU5EUE9JTlRTICoqKioqKioqKipcbmFwcC5nZXQoJy9hcGkvdGVtcGxhdGUvOmlkJywgdGVtcGxhdGVDdHJsLm9uZVRlbXBsYXRlKTtcbmFwcC5wdXQoJy9hcGkvdGVtcGxhdGUvOmlkJywgdGVtcGxhdGVDdHJsLmVkaXRUZW1wbGF0ZSk7XG5hcHAuZGVsZXRlKCcvYXBpL3RlbXBsYXRlLzppZCcsIHRlbXBsYXRlQ3RybC5kZWxldGVUZW1wbGF0ZSk7XG5hcHAucG9zdCgnL2FwaS90ZW1wbGF0ZScsIHRlbXBsYXRlQ3RybC5uZXdUZW1wbGF0ZSk7XG5hcHAuZ2V0KCcvYXBpL3RlbXBsYXRlJywgdGVtcGxhdGVDdHJsLmFsbFRlbXBsYXRlcyk7XG5cbi8vKioqKioqKioqKiBURU1QTEFURSBUQVNLIEVORFBPSU5UUyAqKioqKioqKioqXG5hcHAuZ2V0KCcvYXBpL3Rhc2tzL3RlbXBsYXRlJywgdGVtcGxhdGVUYXNrQ3RybC5nZXRBbGxUYXNrcyk7XG5hcHAucG9zdCgnL2FwaS86dGVtcGxhdGVpZC90YXNrcycsIHRlbXBsYXRlVGFza0N0cmwuYWRkVGFzayk7XG5hcHAuZ2V0KCcvYXBpL3Rhc2tzL3RlbXBsYXRlLzppZCcsIHRlbXBsYXRlVGFza0N0cmwuZ2V0VGFza3MpO1xuXG4vLyoqKioqKioqKiogVElNRSBFTkRQT0lOVFMgKioqKioqKioqKlxuYXBwLmdldCgnL2FwaS90aW1lJywgdGVzdFRpbWVDdHJsLnRlc3RUaW1lKTtcblxuLy8qKioqKioqKioqIFNJTkdMRSBQUk9KRUNUIEVORFBPSU5UUyAqKioqKioqKioqXG5hcHAucG9zdCgnL2FwaS9zaW5nbGVwcm9qZWN0JywgcHJvamVjdEN0cmwubmV3U2luZ2xlUHJvamVjdCk7XG5cbi8vKioqKioqKioqKiBUUklHR0VSRUQgUFJPSkVDVCBFTkRQT0lOVFMgKioqKioqKioqKlxuYXBwLnBvc3QoJy9hcGkvdHJpZ2dlcmVkcHJvamVjdC86dGVtcGxhdGVpZCcsIHByb2plY3RDdHJsLm5ld1RyaWdnZXJlZFByb2plY3QpO1xuXG4vLy0tLS0tLS0tLS0tQ29ubmVjdGlvbiB0byBkYXRhYmFzZS0tLS0tLS0tLS0tLy9cbm1vbmdvb3NlLmNvbm5lY3QoJ21vbmdvZGI6Ly90YXNrdGVybWluYXRvcjpkZXZtb3VudGFpbkBkczAzOTE3NS5tb25nb2xhYi5jb206MzkxNzUvdGFza3Rlcm1pbmF0b3InKTtcbi8vY29uc3QgY29ubmVjdGlvbiA9ICBtb25nb29zZS5jb25uZWN0KCdtb25nb2RiOi8vbG9jYWxob3N0L3Rlcm1pbmF0b3InKTtcbm1vbmdvb3NlLmNvbm5lY3Rpb24ub25jZSgnY29ubmVjdGVkJywgZnVuY3Rpb24oKSB7XG4gIGNvbnNvbGUubG9nKCdjb25uZWN0ZWQgdG8gZGInKTtcbn0pO1xuXG4vLy0tLS0tLS0tLS0tUGFzc3BvcnQgRmFjZWJvb2sgQXV0aGVudGljYXRpb24tLS0tLS0tLS0tLS8vXG4vL2FwcC51c2Uoc2Vzc2lvbih7XG4vLyAgICBzZWNyZXQ6IFwiczBtM3RoMW5cIixcbi8vICAgIHJlc2F2ZTogZmFsc2UsXG4vLyAgICBzYXZlVW5pbml0aWFsaXplZDogZmFsc2UsXG4vL30pKTtcbi8vIGFwcC51c2UocGFzc3BvcnQuaW5pdGlhbGl6ZSgpKTtcbi8vIGFwcC51c2UocGFzc3BvcnQuc2Vzc2lvbigpKTtcbi8vXG4vLyBwYXNzcG9ydC51c2UobmV3IEZhY2Vib29rU3RyYXRlZ3koe1xuLy8gICAgIGNsaWVudElEOiBzZWNyZXQuZmIuY2xpZW50SUQsXG4vLyAgICAgY2xpZW50U2VjcmV0OiBzZWNyZXQuZmIuY2xpZW50U2VjcmV0LFxuLy8gICAgIGNhbGxiYWNrVVJMOiBcImh0dHA6Ly9sb2NhbGhvc3Q6XCIrcG9ydCtcIi9hcGkvYXV0aC9jYWxsYmFja1wiLFxuLy8gICAgIHByb2ZpbGVGaWVsZHM6IFsnaWQnLCAnZW1haWwnLCAnZ2VuZGVyJywgJ2xpbmsnLCAnbG9jYWxlJywgJ25hbWUnLCAndGltZXpvbmUnLCAndXBkYXRlZF90aW1lJywgJ3ZlcmlmaWVkJ11cbi8vICAgICB9LCAgZnVuY3Rpb24oYWNjZXNzVG9rZW4sIHJlZnJlc2hUb2tlbiwgcHJvZmlsZSwgZG9uZSkge1xuLy8gICBcdCAgICBcdHByb2Nlc3MubmV4dFRpY2soZnVuY3Rpb24oKXtcbi8vICAgXHQgICAgXHRcdFVzZXIuZmluZE9uZSh7J2ZhY2Vib29rLmlkJzogcHJvZmlsZS5pZH0sIGZ1bmN0aW9uKGVyciwgdXNlcil7XG4vLyAgIFx0ICAgIFx0XHRcdGlmKGVycilcbi8vICAgXHQgICAgXHRcdFx0XHRyZXR1cm4gZG9uZShlcnIpO1xuLy8gICBcdCAgICBcdFx0XHRpZih1c2VyKVxuLy8gICBcdCAgICBcdFx0XHRcdHJldHVybiBkb25lKG51bGwsIHVzZXIpO1xuLy8gICBcdCAgICBcdFx0XHRlbHNlIHtcbi8vICAgXHQgICAgXHRcdFx0XHR2YXIgbmV3VXNlciA9IG5ldyBVc2VyKCk7XG4vLyAgIFx0ICAgIFx0XHRcdFx0bmV3VXNlci5mYWNlYm9vay5pZCA9IHByb2ZpbGUuaWQ7XG4vLyAgIFx0ICAgIFx0XHRcdFx0bmV3VXNlci5mYWNlYm9vay50b2tlbiA9IGFjY2Vzc1Rva2VuO1xuLy8gICBcdCAgICBcdFx0XHRcdG5ld1VzZXIuZmFjZWJvb2submFtZSA9IHByb2ZpbGUuX2pzb24uZmlyc3RfbmFtZSArIFwiIFwiICsgcHJvZmlsZS5fanNvbi5sYXN0X25hbWU7XG4vLyAgICAgICAgICAgICAgICAgbmV3VXNlci5mYWNlYm9vay5lbWFpbCA9IHByb2ZpbGUuX2pzb24uZW1haWw7XG4vL1xuLy8gICBcdCAgICBcdFx0XHRcdG5ld1VzZXIuc2F2ZShmdW5jdGlvbihlcnIpe1xuLy8gICBcdCAgICBcdFx0XHRcdFx0aWYoZXJyKVxuLy8gICBcdCAgICBcdFx0XHRcdFx0XHR0aHJvdyBlcnI7XG4vLyAgIFx0ICAgIFx0XHRcdFx0XHRyZXR1cm4gZG9uZShudWxsLCBuZXdVc2VyKTtcbi8vICAgXHQgICAgXHRcdFx0XHR9KVxuLy8gICBcdCAgICBcdFx0XHRcdGNvbnNvbGUubG9nKHVzZXIpO1xuLy8gICBcdCAgICBcdFx0XHR9XG4vLyAgIFx0ICAgIFx0XHR9KTtcbi8vICAgXHQgICAgXHR9KTtcbi8vICAgXHQgICAgfVxuLy9cbi8vICkpO1xuXG4vLy0tLS0tLS0tLS0tUGFzc3BvcnQgTG9jYWwgQXV0aGVudGljYXRpb24tLS0tLS0tLS0tLS8vXG5cbi8vIHBhc3Nwb3J0LnVzZShuZXcgTG9jYWxTdHJhdGVneShcbi8vICAgZnVuY3Rpb24odXNlcm5hbWUsIHBhc3N3b3JkLCBkb25lKSB7XG4vLyAgICAgVXNlci5maW5kT25lKHsgdXNlcm5hbWU6IHVzZXJuYW1lIH0sIGZ1bmN0aW9uIChlcnIsIHVzZXIpIHtcbi8vICAgICAgIGlmIChlcnIpIHtcbi8vICAgICAgICAgcmV0dXJuIGRvbmUoZXJyKTtcbi8vICAgICAgIH1cbi8vICAgICAgIGlmICghdXNlcikge1xuLy8gICAgICAgICByZXR1cm4gZG9uZShudWxsLCBmYWxzZSk7XG4vLyAgICAgICB9XG4vLyAgICAgICBpZiAoIXVzZXIudmVyaWZ5UGFzc3dvcmQocGFzc3dvcmQpKSB7XG4vLyAgICAgICAgIHJldHVybiBkb25lKG51bGwsIGZhbHNlKTtcbi8vICAgICAgIH1cbi8vXG4vLyAgICAgICByZXR1cm4gZG9uZShudWxsLCB1c2VyKTtcbi8vICAgICB9KTtcbi8vICAgfVxuLy8gKSk7XG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cblxuLy8gdmFyIHJlcXVpcmVBdXRoID0gZnVuY3Rpb24ocmVxLCByZXMsIG5leHQpIHtcbi8vICAgaWYgKCFyZXEuaXNBdXRoZW50aWNhdGVkKCkpIHtcbi8vICAgICByZXMucmVkaXJlY3QoJy8jL2xvZ2luJyk7XG4vLyAgIH1cbi8vICAgZWxzZSB7IG5leHQoKTsgfVxuLy8gfTtcblxuLy8gYXBwLmdldChcIi9hcGkvYXV0aC9cIiwgcGFzc3BvcnQuYXV0aGVudGljYXRlKFwiZmFjZWJvb2tcIikpO1xuLy8gYXBwLmdldChcIi9hcGkvYXV0aC9jYWxsYmFja1wiLCBwYXNzcG9ydC5hdXRoZW50aWNhdGUoXCJmYWNlYm9va1wiLCB7XG4vLyAgICAgc3VjY2Vzc1JlZGlyZWN0OiBcIi8jL3VzZXIvZGFzaGJvYXJkXCIsXG4vLyAgICAgZmFpbHVyZVJlZGlyZWN0OiBcIi8jL2xvZ2luXCJcbi8vIH0pKTtcbi8vXG4vLyBwYXNzcG9ydC5zZXJpYWxpemVVc2VyKGZ1bmN0aW9uKHVzZXIsIGRvbmUpe1xuLy8gICAgIGRvbmUobnVsbCwgdXNlcik7XG4vLyB9KTtcbi8vIHBhc3Nwb3J0LmRlc2VyaWFsaXplVXNlcihmdW5jdGlvbihvYmosIGRvbmUpe1xuLy8gICAgIGRvbmUobnVsbCwgb2JqKTtcbi8vIH0pO1xuLy9cbi8vIGFwcC5nZXQoXCIvbWVcIiwgcmVxdWlyZUF1dGgsIGZ1bmN0aW9uKHJlcSwgcmVzKXtcbi8vICAgICByZXMuanNvbihyZXEudXNlcik7XG4vLyB9KTtcbi8vXG4vLyBhcHAuZ2V0KFwiL2NoZWNrbG9nZ2VkXCIsIGZ1bmN0aW9uKHJlcSwgcmVzKXtcbi8vICAgICByZXMuc2VuZChyZXEuaXNBdXRoZW50aWNhdGVkKCkgPyByZXEudXNlciA6ICcwJyk7XG4vLyB9KTtcbi8vXG4vLyBhcHAuZ2V0KCcvbG9nb3V0JyxmdW5jdGlvbihyZXEsIHJlcykge1xuLy8gICByZXEubG9nb3V0KCk7XG4vLyAgIHJlcy5yZWRpcmVjdCgnLyMvbG9naW4nKTtcbi8vIH0pXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
