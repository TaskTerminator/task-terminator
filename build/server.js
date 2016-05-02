'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var mongoose = require('mongoose');
var session = require('express-session');
var passport = require('passport');
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
//# sourceMappingURL=data:application/json;base64,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SUFBSSxDQUFDLG9CQUFvQixFQUFFLFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQzs7O0FBQUMsQUFHN0QsR0FBRyxDQUFDLElBQUksQ0FBQyxtQ0FBbUMsRUFBRSxXQUFXLENBQUMsbUJBQW1CLENBQUM7OztBQUFDLEFBRy9FLFFBQVEsQ0FBQyxPQUFPLENBQUMsaUZBQWlGLENBQUM7O0FBQUMsQUFFcEcsUUFBUSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLFlBQVc7QUFDL0MsU0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0NBQ2hDLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQyIsImZpbGUiOiJzZXJ2ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBleHByZXNzID0gcmVxdWlyZSgnZXhwcmVzcycpO1xuY29uc3QgYm9keVBhcnNlciA9IHJlcXVpcmUoJ2JvZHktcGFyc2VyJyk7XG5jb25zdCBjb3JzID0gcmVxdWlyZSgnY29ycycpO1xuY29uc3QgbW9uZ29vc2UgPSByZXF1aXJlKCdtb25nb29zZScpO1xuY29uc3Qgc2Vzc2lvbiA9IHJlcXVpcmUoJ2V4cHJlc3Mtc2Vzc2lvbicpO1xuY29uc3QgcGFzc3BvcnQgPSByZXF1aXJlKCdwYXNzcG9ydCcpO1xuLy8gY29uc3QgRmFjZWJvb2tTdHJhdGVneSA9IHJlcXVpcmUoJ3Bhc3Nwb3J0LWZhY2Vib29rJykuU3RyYXRlZ3k7XG4vLyBjb25zdCBzZWNyZXQgPSByZXF1aXJlKFwiLi9zZWNyZXRcIik7XG4vLyBjb25zdCBiY3J5cHQgPSByZXF1aXJlKCdiY3J5cHQtbm9kZWpzJyk7XG5cbmNvbnN0IGFwcCA9IGV4cHJlc3MoKTtcbmNvbnN0IHBvcnQgPSBwcm9jZXNzLmVudi5QT1JUIHx8IDgwMDA7XG5cbi8vcmVxdWlyZSgnLi9zZXJ2ZXJfYXNzZXRzL2Nyb24vdGVzdCcpLnN0YXJ0KCk7XG5cblxuLy8qKioqKioqKioqIENPTlRST0xMRVJTICoqKioqKioqKipcbmNvbnN0IGNvbXBhbnlDdHJsID0gcmVxdWlyZSgnLi9zZXJ2ZXJfYXNzZXRzL2NvbnRyb2xsZXJzL2NvbXBhbnlDdHJsLmpzJyk7XG5jb25zdCBkZXBhcnRtZW50Q3RybCA9IHJlcXVpcmUoJy4vc2VydmVyX2Fzc2V0cy9jb250cm9sbGVycy9kZXBhcnRtZW50Q3RybC5qcycpO1xuY29uc3QgZW1wbG95ZWVDdHJsID0gcmVxdWlyZSgnLi9zZXJ2ZXJfYXNzZXRzL2NvbnRyb2xsZXJzL2VtcGxveWVlQ3RybC5qcycpO1xuY29uc3QgcG9zaXRpb25DdHJsID0gcmVxdWlyZSgnLi9zZXJ2ZXJfYXNzZXRzL2NvbnRyb2xsZXJzL3Bvc2l0aW9uQ3RybC5qcycpO1xuY29uc3QgcHJvamVjdEN0cmwgPSByZXF1aXJlKCcuL3NlcnZlcl9hc3NldHMvY29udHJvbGxlcnMvcHJvamVjdEN0cmwuanMnKTtcbmNvbnN0IHByb2plY3RUYXNrQ3RybCA9IHJlcXVpcmUoJy4vc2VydmVyX2Fzc2V0cy9jb250cm9sbGVycy9wcm9qZWN0VGFza0N0cmwuanMnKTtcbmNvbnN0IHRlbXBsYXRlQ3RybCA9IHJlcXVpcmUoJy4vc2VydmVyX2Fzc2V0cy9jb250cm9sbGVycy90ZW1wbGF0ZUN0cmwuanMnKTtcbmNvbnN0IHRlbXBsYXRlVGFza0N0cmwgPSByZXF1aXJlKCcuL3NlcnZlcl9hc3NldHMvY29udHJvbGxlcnMvdGVtcGxhdGVUYXNrQ3RybC5qcycpO1xuY29uc3Qgc2xhY2tDdHJsID0gcmVxdWlyZSgnLi9zZXJ2ZXJfYXNzZXRzL2NvbnRyb2xsZXJzL3NsYWNrQ3RybC5qcycpO1xuY29uc3QgdGVzdFRpbWVDdHJsID0gcmVxdWlyZSgnLi9zZXJ2ZXJfYXNzZXRzL2NvbnRyb2xsZXJzL3Rlc3RUaW1lQ3RybC5qcycpO1xuXG5tb25nb29zZS5Qcm9taXNlID0gcmVxdWlyZSgncScpLlByb21pc2U7XG5cbi8vLS0tLS0tLS0tLU1pZGRsZXdhcmUtLS0tLS0tLS0tLS0vL1xuYXBwLnVzZShib2R5UGFyc2VyLnVybGVuY29kZWQoe2V4dGVuZGVkOmZhbHNlfSkpO1xuYXBwLnVzZShib2R5UGFyc2VyLmpzb24oKSk7XG5hcHAudXNlKGNvcnMoKSk7XG5hcHAudXNlKGV4cHJlc3Muc3RhdGljKF9fZGlybmFtZSsnL3B1YmxpYycpKTtcbmFwcC5saXN0ZW4ocG9ydCwgZnVuY3Rpb24gKCkge1xuICBjb25zb2xlLmxvZyhcIkxpc3RlbmluZyBvbiBwb3J0OiBcIiArIHBvcnQpO1xufSk7XG5cbi8vKioqKioqKioqKiBDT01QQU5ZIEVORFBPSU5UUyAqKioqKioqKioqXG5hcHAucG9zdCgnL2FwaS9jb21wYW55JywgY29tcGFueUN0cmwubmV3Q29tcGFueSk7XG5hcHAuZ2V0KCcvYXBpL2NvbXBhbnknLCBjb21wYW55Q3RybC5hbGxDb21wYW5pZXMpO1xuYXBwLmdldCgnL2FwaS9jb21wYW55LzppZCcsIGNvbXBhbnlDdHJsLmdldE9uZUNvbXBhbnkpO1xuXG4vLyoqKioqKioqKiogREVQQVJUTUVOVCBFTkRQT0lOVFMgKioqKioqKioqKlxuYXBwLmdldCgnL2FwaS9kZXBhcnRtZW50LzppZCcsIGRlcGFydG1lbnRDdHJsLm9uZURlcGFydG1lbnQpO1xuYXBwLnB1dCgnL2FwaS9kZXBhcnRtZW50LzppZCcsIGRlcGFydG1lbnRDdHJsLmVkaXREZXBhcnRtZW50KTtcbmFwcC5kZWxldGUoJy9hcGkvZGVwYXJ0bWVudC86aWQnLCBkZXBhcnRtZW50Q3RybC5kZWxldGVEZXBhcnRtZW50KTtcbmFwcC5wb3N0KCcvYXBpL2RlcGFydG1lbnQvOmNvbXBhbnlpZCcsIGRlcGFydG1lbnRDdHJsLm5ld0RlcGFydG1lbnQpO1xuXG5hcHAuZ2V0KCcvYXBpL2RlcGFydG1lbnQnLCBkZXBhcnRtZW50Q3RybC5hbGxEZXBhcnRtZW50cyk7XG5cblxuLy8qKioqKioqKioqIEVNUExPWUVFIEVORFBPSU5UUyAqKioqKioqKioqXG5hcHAuZ2V0KCcvYXBpL2VtcGxveWVlLzppZCcsIGVtcGxveWVlQ3RybC5vbmVFbXBsb3llZSk7XG5hcHAucHV0KCcvYXBpL2VtcGxveWVlLzppZCcsIGVtcGxveWVlQ3RybC5lZGl0RW1wbG95ZWUpO1xuYXBwLmRlbGV0ZSgnL2FwaS9lbXBsb3llZS86aWQnLCBlbXBsb3llZUN0cmwuZGVsZXRlRW1wbG95ZWUpO1xuYXBwLnBvc3QoJy9hcGkvOmNvbXBhbnlpZC86ZGVwYXJ0bWVudGlkLzpwb3NpdGlvbmlkL2VtcGxveWVlJywgZW1wbG95ZWVDdHJsLm5ld0VtcGxveWVlKTtcbmFwcC5nZXQoJy9hcGkvOmNvbXBhbnlpZC9lbXBsb3llZScsIGVtcGxveWVlQ3RybC5hbGxFbXBsb3llZXMpO1xuXG5cbi8vKioqKioqKioqKiBQT1NJVElPTiBFTkRQT0lOVFMgKioqKioqKioqKlxuYXBwLmdldCgnL2FwaS9wb3NpdGlvbi86aWQnLCBwb3NpdGlvbkN0cmwub25lUG9zaXRpb24pO1xuYXBwLnB1dCgnL2FwaS9wb3NpdGlvbi86aWQnLCBwb3NpdGlvbkN0cmwuZWRpdFBvc2l0aW9uKTtcbmFwcC5kZWxldGUoJy9hcGkvcG9zaXRpb24vOmlkJywgcG9zaXRpb25DdHJsLmRlbGV0ZVBvc2l0aW9uKTtcbmFwcC5wb3N0KCcvYXBpL3Bvc2l0aW9uLzpjb21wYW55aWQvOmRlcGFydG1lbnRpZCcsIHBvc2l0aW9uQ3RybC5uZXdQb3NpdGlvbik7XG5hcHAuZ2V0KCcvYXBpL3Bvc2l0aW9uJywgcG9zaXRpb25DdHJsLmFsbFBvc2l0aW9ucyk7XG5cbi8vKioqKioqKioqKiBQUk9KRUNUIEVORFBPSU5UUyAqKioqKioqKioqXG5hcHAuZ2V0KCcvYXBpL3Byb2plY3QvOmlkJywgcHJvamVjdEN0cmwub25lUHJvamVjdCk7XG5hcHAucHV0KCcvYXBpL3Byb2plY3QvOmlkJywgcHJvamVjdEN0cmwuZWRpdFByb2plY3QpO1xuYXBwLmRlbGV0ZSgnL2FwaS9wcm9qZWN0LzppZCcsIHByb2plY3RDdHJsLmRlbGV0ZVByb2plY3QpO1xuYXBwLnBvc3QoJy9hcGkvcHJvamVjdC86dGVtcGxhdGVpZCcsIHByb2plY3RDdHJsLmVuZHBvaW50UHJvamVjdCk7XG5hcHAuZ2V0KCcvYXBpL3Byb2plY3QnLCBwcm9qZWN0Q3RybC5hbGxQcm9qZWN0cyk7XG5cbi8vKioqKioqKioqKiBQUk9KRUNUIFRBU0sgRU5EUE9JTlRTICoqKioqKioqKipcbmFwcC5nZXQoJy9hcGkvdGFza3MvcHJvamVjdC86aWQnLCBwcm9qZWN0VGFza0N0cmwuZ2V0VGFza3MpO1xuYXBwLnBvc3QoJy9hcGkvdGFza3MvcHJvamVjdC86cHJvamVjdGlkJywgcHJvamVjdFRhc2tDdHJsLmFkZFRhc2spO1xuYXBwLnB1dCgnL2FwaS90YXNrcy9wcm9qZWN0Lzpwcm9qZWN0aWQnLCBwcm9qZWN0VGFza0N0cmwuZWRpdFRhc2spO1xuLy8gKiBhcHAuZ2V0KCcvYXBpL3Rhc2tzL2RlcGFydG1lbnQvOmlkJywgcHJvamVjdFRhc2tDdHJsLmdldERlcGFydG1lbnRUYXNrKTtcblxuLy8qKioqKioqKioqIFRFTVBMQVRFIEVORFBPSU5UUyAqKioqKioqKioqXG5hcHAuZ2V0KCcvYXBpL3RlbXBsYXRlLzppZCcsIHRlbXBsYXRlQ3RybC5vbmVUZW1wbGF0ZSk7XG5hcHAucHV0KCcvYXBpL3RlbXBsYXRlLzppZCcsIHRlbXBsYXRlQ3RybC5lZGl0VGVtcGxhdGUpO1xuYXBwLmRlbGV0ZSgnL2FwaS90ZW1wbGF0ZS86aWQnLCB0ZW1wbGF0ZUN0cmwuZGVsZXRlVGVtcGxhdGUpO1xuYXBwLnBvc3QoJy9hcGkvdGVtcGxhdGUnLCB0ZW1wbGF0ZUN0cmwubmV3VGVtcGxhdGUpO1xuYXBwLmdldCgnL2FwaS90ZW1wbGF0ZScsIHRlbXBsYXRlQ3RybC5hbGxUZW1wbGF0ZXMpO1xuXG4vLyoqKioqKioqKiogVEVNUExBVEUgVEFTSyBFTkRQT0lOVFMgKioqKioqKioqKlxuYXBwLmdldCgnL2FwaS90YXNrcy90ZW1wbGF0ZScsIHRlbXBsYXRlVGFza0N0cmwuZ2V0QWxsVGFza3MpO1xuYXBwLnBvc3QoJy9hcGkvOnRlbXBsYXRlaWQvdGFza3MnLCB0ZW1wbGF0ZVRhc2tDdHJsLmFkZFRhc2spO1xuYXBwLmdldCgnL2FwaS90YXNrcy90ZW1wbGF0ZS86aWQnLCB0ZW1wbGF0ZVRhc2tDdHJsLmdldFRhc2tzKTtcblxuLy8qKioqKioqKioqIFRJTUUgRU5EUE9JTlRTICoqKioqKioqKipcbmFwcC5nZXQoJy9hcGkvdGltZScsIHRlc3RUaW1lQ3RybC50ZXN0VGltZSk7XG5cbi8vKioqKioqKioqKiBTSU5HTEUgUFJPSkVDVCBFTkRQT0lOVFMgKioqKioqKioqKlxuYXBwLnBvc3QoJy9hcGkvc2luZ2xlcHJvamVjdCcsIHByb2plY3RDdHJsLm5ld1NpbmdsZVByb2plY3QpO1xuXG4vLyoqKioqKioqKiogVFJJR0dFUkVEIFBST0pFQ1QgRU5EUE9JTlRTICoqKioqKioqKipcbmFwcC5wb3N0KCcvYXBpL3RyaWdnZXJlZHByb2plY3QvOnRlbXBsYXRlaWQnLCBwcm9qZWN0Q3RybC5uZXdUcmlnZ2VyZWRQcm9qZWN0KTtcblxuLy8tLS0tLS0tLS0tLUNvbm5lY3Rpb24gdG8gZGF0YWJhc2UtLS0tLS0tLS0tLS8vXG5tb25nb29zZS5jb25uZWN0KCdtb25nb2RiOi8vdGFza3Rlcm1pbmF0b3I6ZGV2bW91bnRhaW5AZHMwMzkxNzUubW9uZ29sYWIuY29tOjM5MTc1L3Rhc2t0ZXJtaW5hdG9yJyk7XG4vL2NvbnN0IGNvbm5lY3Rpb24gPSAgbW9uZ29vc2UuY29ubmVjdCgnbW9uZ29kYjovL2xvY2FsaG9zdC90ZXJtaW5hdG9yJyk7XG5tb25nb29zZS5jb25uZWN0aW9uLm9uY2UoJ2Nvbm5lY3RlZCcsIGZ1bmN0aW9uKCkge1xuICBjb25zb2xlLmxvZygnY29ubmVjdGVkIHRvIGRiJyk7XG59KTtcblxuLy8tLS0tLS0tLS0tLVBhc3Nwb3J0IEZhY2Vib29rIEF1dGhlbnRpY2F0aW9uLS0tLS0tLS0tLS0vL1xuLy9hcHAudXNlKHNlc3Npb24oe1xuLy8gICAgc2VjcmV0OiBcInMwbTN0aDFuXCIsXG4vLyAgICByZXNhdmU6IGZhbHNlLFxuLy8gICAgc2F2ZVVuaW5pdGlhbGl6ZWQ6IGZhbHNlLFxuLy99KSk7XG4vLyBhcHAudXNlKHBhc3Nwb3J0LmluaXRpYWxpemUoKSk7XG4vLyBhcHAudXNlKHBhc3Nwb3J0LnNlc3Npb24oKSk7XG4vL1xuLy8gcGFzc3BvcnQudXNlKG5ldyBGYWNlYm9va1N0cmF0ZWd5KHtcbi8vICAgICBjbGllbnRJRDogc2VjcmV0LmZiLmNsaWVudElELFxuLy8gICAgIGNsaWVudFNlY3JldDogc2VjcmV0LmZiLmNsaWVudFNlY3JldCxcbi8vICAgICBjYWxsYmFja1VSTDogXCJodHRwOi8vbG9jYWxob3N0OlwiK3BvcnQrXCIvYXBpL2F1dGgvY2FsbGJhY2tcIixcbi8vICAgICBwcm9maWxlRmllbGRzOiBbJ2lkJywgJ2VtYWlsJywgJ2dlbmRlcicsICdsaW5rJywgJ2xvY2FsZScsICduYW1lJywgJ3RpbWV6b25lJywgJ3VwZGF0ZWRfdGltZScsICd2ZXJpZmllZCddXG4vLyAgICAgfSwgIGZ1bmN0aW9uKGFjY2Vzc1Rva2VuLCByZWZyZXNoVG9rZW4sIHByb2ZpbGUsIGRvbmUpIHtcbi8vICAgXHQgICAgXHRwcm9jZXNzLm5leHRUaWNrKGZ1bmN0aW9uKCl7XG4vLyAgIFx0ICAgIFx0XHRVc2VyLmZpbmRPbmUoeydmYWNlYm9vay5pZCc6IHByb2ZpbGUuaWR9LCBmdW5jdGlvbihlcnIsIHVzZXIpe1xuLy8gICBcdCAgICBcdFx0XHRpZihlcnIpXG4vLyAgIFx0ICAgIFx0XHRcdFx0cmV0dXJuIGRvbmUoZXJyKTtcbi8vICAgXHQgICAgXHRcdFx0aWYodXNlcilcbi8vICAgXHQgICAgXHRcdFx0XHRyZXR1cm4gZG9uZShudWxsLCB1c2VyKTtcbi8vICAgXHQgICAgXHRcdFx0ZWxzZSB7XG4vLyAgIFx0ICAgIFx0XHRcdFx0dmFyIG5ld1VzZXIgPSBuZXcgVXNlcigpO1xuLy8gICBcdCAgICBcdFx0XHRcdG5ld1VzZXIuZmFjZWJvb2suaWQgPSBwcm9maWxlLmlkO1xuLy8gICBcdCAgICBcdFx0XHRcdG5ld1VzZXIuZmFjZWJvb2sudG9rZW4gPSBhY2Nlc3NUb2tlbjtcbi8vICAgXHQgICAgXHRcdFx0XHRuZXdVc2VyLmZhY2Vib29rLm5hbWUgPSBwcm9maWxlLl9qc29uLmZpcnN0X25hbWUgKyBcIiBcIiArIHByb2ZpbGUuX2pzb24ubGFzdF9uYW1lO1xuLy8gICAgICAgICAgICAgICAgIG5ld1VzZXIuZmFjZWJvb2suZW1haWwgPSBwcm9maWxlLl9qc29uLmVtYWlsO1xuLy9cbi8vICAgXHQgICAgXHRcdFx0XHRuZXdVc2VyLnNhdmUoZnVuY3Rpb24oZXJyKXtcbi8vICAgXHQgICAgXHRcdFx0XHRcdGlmKGVycilcbi8vICAgXHQgICAgXHRcdFx0XHRcdFx0dGhyb3cgZXJyO1xuLy8gICBcdCAgICBcdFx0XHRcdFx0cmV0dXJuIGRvbmUobnVsbCwgbmV3VXNlcik7XG4vLyAgIFx0ICAgIFx0XHRcdFx0fSlcbi8vICAgXHQgICAgXHRcdFx0XHRjb25zb2xlLmxvZyh1c2VyKTtcbi8vICAgXHQgICAgXHRcdFx0fVxuLy8gICBcdCAgICBcdFx0fSk7XG4vLyAgIFx0ICAgIFx0fSk7XG4vLyAgIFx0ICAgIH1cbi8vXG4vLyApKTtcblxuLy8tLS0tLS0tLS0tLVBhc3Nwb3J0IExvY2FsIEF1dGhlbnRpY2F0aW9uLS0tLS0tLS0tLS0vL1xuXG4vLyBwYXNzcG9ydC51c2UobmV3IExvY2FsU3RyYXRlZ3koXG4vLyAgIGZ1bmN0aW9uKHVzZXJuYW1lLCBwYXNzd29yZCwgZG9uZSkge1xuLy8gICAgIFVzZXIuZmluZE9uZSh7IHVzZXJuYW1lOiB1c2VybmFtZSB9LCBmdW5jdGlvbiAoZXJyLCB1c2VyKSB7XG4vLyAgICAgICBpZiAoZXJyKSB7XG4vLyAgICAgICAgIHJldHVybiBkb25lKGVycik7XG4vLyAgICAgICB9XG4vLyAgICAgICBpZiAoIXVzZXIpIHtcbi8vICAgICAgICAgcmV0dXJuIGRvbmUobnVsbCwgZmFsc2UpO1xuLy8gICAgICAgfVxuLy8gICAgICAgaWYgKCF1c2VyLnZlcmlmeVBhc3N3b3JkKHBhc3N3b3JkKSkge1xuLy8gICAgICAgICByZXR1cm4gZG9uZShudWxsLCBmYWxzZSk7XG4vLyAgICAgICB9XG4vL1xuLy8gICAgICAgcmV0dXJuIGRvbmUobnVsbCwgdXNlcik7XG4vLyAgICAgfSk7XG4vLyAgIH1cbi8vICkpO1xuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXG5cbi8vIHZhciByZXF1aXJlQXV0aCA9IGZ1bmN0aW9uKHJlcSwgcmVzLCBuZXh0KSB7XG4vLyAgIGlmICghcmVxLmlzQXV0aGVudGljYXRlZCgpKSB7XG4vLyAgICAgcmVzLnJlZGlyZWN0KCcvIy9sb2dpbicpO1xuLy8gICB9XG4vLyAgIGVsc2UgeyBuZXh0KCk7IH1cbi8vIH07XG5cbi8vIGFwcC5nZXQoXCIvYXBpL2F1dGgvXCIsIHBhc3Nwb3J0LmF1dGhlbnRpY2F0ZShcImZhY2Vib29rXCIpKTtcbi8vIGFwcC5nZXQoXCIvYXBpL2F1dGgvY2FsbGJhY2tcIiwgcGFzc3BvcnQuYXV0aGVudGljYXRlKFwiZmFjZWJvb2tcIiwge1xuLy8gICAgIHN1Y2Nlc3NSZWRpcmVjdDogXCIvIy91c2VyL2Rhc2hib2FyZFwiLFxuLy8gICAgIGZhaWx1cmVSZWRpcmVjdDogXCIvIy9sb2dpblwiXG4vLyB9KSk7XG4vL1xuLy8gcGFzc3BvcnQuc2VyaWFsaXplVXNlcihmdW5jdGlvbih1c2VyLCBkb25lKXtcbi8vICAgICBkb25lKG51bGwsIHVzZXIpO1xuLy8gfSk7XG4vLyBwYXNzcG9ydC5kZXNlcmlhbGl6ZVVzZXIoZnVuY3Rpb24ob2JqLCBkb25lKXtcbi8vICAgICBkb25lKG51bGwsIG9iaik7XG4vLyB9KTtcbi8vXG4vLyBhcHAuZ2V0KFwiL21lXCIsIHJlcXVpcmVBdXRoLCBmdW5jdGlvbihyZXEsIHJlcyl7XG4vLyAgICAgcmVzLmpzb24ocmVxLnVzZXIpO1xuLy8gfSk7XG4vL1xuLy8gYXBwLmdldChcIi9jaGVja2xvZ2dlZFwiLCBmdW5jdGlvbihyZXEsIHJlcyl7XG4vLyAgICAgcmVzLnNlbmQocmVxLmlzQXV0aGVudGljYXRlZCgpID8gcmVxLnVzZXIgOiAnMCcpO1xuLy8gfSk7XG4vL1xuLy8gYXBwLmdldCgnL2xvZ291dCcsZnVuY3Rpb24ocmVxLCByZXMpIHtcbi8vICAgcmVxLmxvZ291dCgpO1xuLy8gICByZXMucmVkaXJlY3QoJy8jL2xvZ2luJyk7XG4vLyB9KVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
