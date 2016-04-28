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

require('./server_assets/cron/test').start();

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
//# sourceMappingURL=data:application/json;base64,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QUFFLFlBQVksQ0FBQyxRQUFRLENBQUM7OztBQUFDLEFBRzVDLEdBQUcsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLEVBQUUsV0FBVyxDQUFDLGdCQUFnQixDQUFDOzs7QUFBQyxBQUc3RCxHQUFHLENBQUMsSUFBSSxDQUFDLG1DQUFtQyxFQUFFLFdBQVcsQ0FBQyxtQkFBbUIsQ0FBQzs7O0FBQUMsQUFHL0UsUUFBUSxDQUFDLE9BQU8sQ0FBQyxpRkFBaUYsQ0FBQzs7QUFBQyxBQUVwRyxRQUFRLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsWUFBVztBQUMvQyxTQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLENBQUM7Q0FDaEMsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFDIiwiZmlsZSI6InNlcnZlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGV4cHJlc3MgPSByZXF1aXJlKCdleHByZXNzJyk7XG5jb25zdCBib2R5UGFyc2VyID0gcmVxdWlyZSgnYm9keS1wYXJzZXInKTtcbmNvbnN0IGNvcnMgPSByZXF1aXJlKCdjb3JzJyk7XG5jb25zdCBtb25nb29zZSA9IHJlcXVpcmUoJ21vbmdvb3NlJyk7XG5jb25zdCBzZXNzaW9uID0gcmVxdWlyZSgnZXhwcmVzcy1zZXNzaW9uJyk7XG5jb25zdCBwYXNzcG9ydCA9IHJlcXVpcmUoJ3Bhc3Nwb3J0Jyk7XG4vLyBjb25zdCBGYWNlYm9va1N0cmF0ZWd5ID0gcmVxdWlyZSgncGFzc3BvcnQtZmFjZWJvb2snKS5TdHJhdGVneTtcbi8vIGNvbnN0IHNlY3JldCA9IHJlcXVpcmUoXCIuL3NlY3JldFwiKTtcbi8vIGNvbnN0IGJjcnlwdCA9IHJlcXVpcmUoJ2JjcnlwdC1ub2RlanMnKTtcblxuY29uc3QgYXBwID0gZXhwcmVzcygpO1xuY29uc3QgcG9ydCA9IHByb2Nlc3MuZW52LlBPUlQgfHwgODAwMDtcblxuIHJlcXVpcmUoJy4vc2VydmVyX2Fzc2V0cy9jcm9uL3Rlc3QnKS5zdGFydCgpO1xuXG5cbi8vKioqKioqKioqKiBDT05UUk9MTEVSUyAqKioqKioqKioqXG5jb25zdCBjb21wYW55Q3RybCA9IHJlcXVpcmUoJy4vc2VydmVyX2Fzc2V0cy9jb250cm9sbGVycy9jb21wYW55Q3RybC5qcycpO1xuY29uc3QgZGVwYXJ0bWVudEN0cmwgPSByZXF1aXJlKCcuL3NlcnZlcl9hc3NldHMvY29udHJvbGxlcnMvZGVwYXJ0bWVudEN0cmwuanMnKTtcbmNvbnN0IGVtcGxveWVlQ3RybCA9IHJlcXVpcmUoJy4vc2VydmVyX2Fzc2V0cy9jb250cm9sbGVycy9lbXBsb3llZUN0cmwuanMnKTtcbmNvbnN0IHBvc2l0aW9uQ3RybCA9IHJlcXVpcmUoJy4vc2VydmVyX2Fzc2V0cy9jb250cm9sbGVycy9wb3NpdGlvbkN0cmwuanMnKTtcbmNvbnN0IHByb2plY3RDdHJsID0gcmVxdWlyZSgnLi9zZXJ2ZXJfYXNzZXRzL2NvbnRyb2xsZXJzL3Byb2plY3RDdHJsLmpzJyk7XG5jb25zdCBwcm9qZWN0VGFza0N0cmwgPSByZXF1aXJlKCcuL3NlcnZlcl9hc3NldHMvY29udHJvbGxlcnMvcHJvamVjdFRhc2tDdHJsLmpzJyk7XG5jb25zdCB0ZW1wbGF0ZUN0cmwgPSByZXF1aXJlKCcuL3NlcnZlcl9hc3NldHMvY29udHJvbGxlcnMvdGVtcGxhdGVDdHJsLmpzJyk7XG5jb25zdCB0ZW1wbGF0ZVRhc2tDdHJsID0gcmVxdWlyZSgnLi9zZXJ2ZXJfYXNzZXRzL2NvbnRyb2xsZXJzL3RlbXBsYXRlVGFza0N0cmwuanMnKTtcbmNvbnN0IHNsYWNrQ3RybCA9IHJlcXVpcmUoJy4vc2VydmVyX2Fzc2V0cy9jb250cm9sbGVycy9zbGFja0N0cmwuanMnKTtcbmNvbnN0IHRlc3RUaW1lQ3RybCA9IHJlcXVpcmUoJy4vc2VydmVyX2Fzc2V0cy9jb250cm9sbGVycy90ZXN0VGltZUN0cmwuanMnKTtcblxubW9uZ29vc2UuUHJvbWlzZSA9IHJlcXVpcmUoJ3EnKS5Qcm9taXNlO1xuXG4vLy0tLS0tLS0tLS1NaWRkbGV3YXJlLS0tLS0tLS0tLS0tLy9cbmFwcC51c2UoYm9keVBhcnNlci51cmxlbmNvZGVkKHtleHRlbmRlZDpmYWxzZX0pKTtcbmFwcC51c2UoYm9keVBhcnNlci5qc29uKCkpO1xuYXBwLnVzZShjb3JzKCkpO1xuYXBwLnVzZShleHByZXNzLnN0YXRpYyhfX2Rpcm5hbWUrJy9wdWJsaWMnKSk7XG5hcHAubGlzdGVuKHBvcnQsIGZ1bmN0aW9uICgpIHtcbiAgY29uc29sZS5sb2coXCJMaXN0ZW5pbmcgb24gcG9ydDogXCIgKyBwb3J0KTtcbn0pO1xuXG4vLyoqKioqKioqKiogQ09NUEFOWSBFTkRQT0lOVFMgKioqKioqKioqKlxuYXBwLnBvc3QoJy9hcGkvY29tcGFueScsIGNvbXBhbnlDdHJsLm5ld0NvbXBhbnkpO1xuYXBwLmdldCgnL2FwaS9jb21wYW55JywgY29tcGFueUN0cmwuYWxsQ29tcGFuaWVzKTtcbmFwcC5nZXQoJy9hcGkvY29tcGFueS86aWQnLCBjb21wYW55Q3RybC5nZXRPbmVDb21wYW55KTtcblxuLy8qKioqKioqKioqIERFUEFSVE1FTlQgRU5EUE9JTlRTICoqKioqKioqKipcbmFwcC5nZXQoJy9hcGkvZGVwYXJ0bWVudC86aWQnLCBkZXBhcnRtZW50Q3RybC5vbmVEZXBhcnRtZW50KTtcbmFwcC5wdXQoJy9hcGkvZGVwYXJ0bWVudC86aWQnLCBkZXBhcnRtZW50Q3RybC5lZGl0RGVwYXJ0bWVudCk7XG5hcHAuZGVsZXRlKCcvYXBpL2RlcGFydG1lbnQvOmlkJywgZGVwYXJ0bWVudEN0cmwuZGVsZXRlRGVwYXJ0bWVudCk7XG5hcHAucG9zdCgnL2FwaS9kZXBhcnRtZW50Lzpjb21wYW55aWQnLCBkZXBhcnRtZW50Q3RybC5uZXdEZXBhcnRtZW50KTtcblxuYXBwLmdldCgnL2FwaS9kZXBhcnRtZW50JywgZGVwYXJ0bWVudEN0cmwuYWxsRGVwYXJ0bWVudHMpO1xuXG5cbi8vKioqKioqKioqKiBFTVBMT1lFRSBFTkRQT0lOVFMgKioqKioqKioqKlxuYXBwLmdldCgnL2FwaS9lbXBsb3llZS86aWQnLCBlbXBsb3llZUN0cmwub25lRW1wbG95ZWUpO1xuYXBwLnB1dCgnL2FwaS9lbXBsb3llZS86aWQnLCBlbXBsb3llZUN0cmwuZWRpdEVtcGxveWVlKTtcbmFwcC5kZWxldGUoJy9hcGkvZW1wbG95ZWUvOmlkJywgZW1wbG95ZWVDdHJsLmRlbGV0ZUVtcGxveWVlKTtcbmFwcC5wb3N0KCcvYXBpLzpjb21wYW55aWQvOmRlcGFydG1lbnRpZC86cG9zaXRpb25pZC9lbXBsb3llZScsIGVtcGxveWVlQ3RybC5uZXdFbXBsb3llZSk7XG5hcHAuZ2V0KCcvYXBpLzpjb21wYW55aWQvZW1wbG95ZWUnLCBlbXBsb3llZUN0cmwuYWxsRW1wbG95ZWVzKTtcblxuXG4vLyoqKioqKioqKiogUE9TSVRJT04gRU5EUE9JTlRTICoqKioqKioqKipcbmFwcC5nZXQoJy9hcGkvcG9zaXRpb24vOmlkJywgcG9zaXRpb25DdHJsLm9uZVBvc2l0aW9uKTtcbmFwcC5wdXQoJy9hcGkvcG9zaXRpb24vOmlkJywgcG9zaXRpb25DdHJsLmVkaXRQb3NpdGlvbik7XG5hcHAuZGVsZXRlKCcvYXBpL3Bvc2l0aW9uLzppZCcsIHBvc2l0aW9uQ3RybC5kZWxldGVQb3NpdGlvbik7XG5hcHAucG9zdCgnL2FwaS9wb3NpdGlvbi86Y29tcGFueWlkLzpkZXBhcnRtZW50aWQnLCBwb3NpdGlvbkN0cmwubmV3UG9zaXRpb24pO1xuYXBwLmdldCgnL2FwaS9wb3NpdGlvbicsIHBvc2l0aW9uQ3RybC5hbGxQb3NpdGlvbnMpO1xuXG4vLyoqKioqKioqKiogUFJPSkVDVCBFTkRQT0lOVFMgKioqKioqKioqKlxuYXBwLmdldCgnL2FwaS9wcm9qZWN0LzppZCcsIHByb2plY3RDdHJsLm9uZVByb2plY3QpO1xuYXBwLnB1dCgnL2FwaS9wcm9qZWN0LzppZCcsIHByb2plY3RDdHJsLmVkaXRQcm9qZWN0KTtcbmFwcC5kZWxldGUoJy9hcGkvcHJvamVjdC86aWQnLCBwcm9qZWN0Q3RybC5kZWxldGVQcm9qZWN0KTtcbmFwcC5wb3N0KCcvYXBpL3Byb2plY3QvOnRlbXBsYXRlaWQnLCBwcm9qZWN0Q3RybC5lbmRwb2ludFByb2plY3QpO1xuYXBwLmdldCgnL2FwaS9wcm9qZWN0JywgcHJvamVjdEN0cmwuYWxsUHJvamVjdHMpO1xuXG4vLyoqKioqKioqKiogUFJPSkVDVCBUQVNLIEVORFBPSU5UUyAqKioqKioqKioqXG5hcHAuZ2V0KCcvYXBpL3Rhc2tzL3Byb2plY3QvOmlkJywgcHJvamVjdFRhc2tDdHJsLmdldFRhc2tzKTtcbmFwcC5wb3N0KCcvYXBpL3Rhc2tzL3Byb2plY3QvOnByb2plY3RpZCcsIHByb2plY3RUYXNrQ3RybC5hZGRUYXNrKTtcbmFwcC5wdXQoJy9hcGkvdGFza3MvcHJvamVjdC86cHJvamVjdGlkJywgcHJvamVjdFRhc2tDdHJsLmVkaXRUYXNrKTtcbi8vICogYXBwLmdldCgnL2FwaS90YXNrcy9kZXBhcnRtZW50LzppZCcsIHByb2plY3RUYXNrQ3RybC5nZXREZXBhcnRtZW50VGFzayk7XG5cbi8vKioqKioqKioqKiBURU1QTEFURSBFTkRQT0lOVFMgKioqKioqKioqKlxuYXBwLmdldCgnL2FwaS90ZW1wbGF0ZS86aWQnLCB0ZW1wbGF0ZUN0cmwub25lVGVtcGxhdGUpO1xuYXBwLnB1dCgnL2FwaS90ZW1wbGF0ZS86aWQnLCB0ZW1wbGF0ZUN0cmwuZWRpdFRlbXBsYXRlKTtcbmFwcC5kZWxldGUoJy9hcGkvdGVtcGxhdGUvOmlkJywgdGVtcGxhdGVDdHJsLmRlbGV0ZVRlbXBsYXRlKTtcbmFwcC5wb3N0KCcvYXBpL3RlbXBsYXRlJywgdGVtcGxhdGVDdHJsLm5ld1RlbXBsYXRlKTtcbmFwcC5nZXQoJy9hcGkvdGVtcGxhdGUnLCB0ZW1wbGF0ZUN0cmwuYWxsVGVtcGxhdGVzKTtcblxuLy8qKioqKioqKioqIFRFTVBMQVRFIFRBU0sgRU5EUE9JTlRTICoqKioqKioqKipcbmFwcC5nZXQoJy9hcGkvdGFza3MvdGVtcGxhdGUnLCB0ZW1wbGF0ZVRhc2tDdHJsLmdldEFsbFRhc2tzKTtcbmFwcC5wb3N0KCcvYXBpLzp0ZW1wbGF0ZWlkL3Rhc2tzJywgdGVtcGxhdGVUYXNrQ3RybC5hZGRUYXNrKTtcbmFwcC5nZXQoJy9hcGkvdGFza3MvdGVtcGxhdGUvOmlkJywgdGVtcGxhdGVUYXNrQ3RybC5nZXRUYXNrcyk7XG5cbi8vKioqKioqKioqKiBUSU1FIEVORFBPSU5UUyAqKioqKioqKioqXG5hcHAuZ2V0KCcvYXBpL3RpbWUnLCB0ZXN0VGltZUN0cmwudGVzdFRpbWUpO1xuXG4vLyoqKioqKioqKiogU0lOR0xFIFBST0pFQ1QgRU5EUE9JTlRTICoqKioqKioqKipcbmFwcC5wb3N0KCcvYXBpL3NpbmdsZXByb2plY3QnLCBwcm9qZWN0Q3RybC5uZXdTaW5nbGVQcm9qZWN0KTtcblxuLy8qKioqKioqKioqIFRSSUdHRVJFRCBQUk9KRUNUIEVORFBPSU5UUyAqKioqKioqKioqXG5hcHAucG9zdCgnL2FwaS90cmlnZ2VyZWRwcm9qZWN0Lzp0ZW1wbGF0ZWlkJywgcHJvamVjdEN0cmwubmV3VHJpZ2dlcmVkUHJvamVjdCk7XG5cbi8vLS0tLS0tLS0tLS1Db25uZWN0aW9uIHRvIGRhdGFiYXNlLS0tLS0tLS0tLS0vL1xubW9uZ29vc2UuY29ubmVjdCgnbW9uZ29kYjovL3Rhc2t0ZXJtaW5hdG9yOmRldm1vdW50YWluQGRzMDM5MTc1Lm1vbmdvbGFiLmNvbTozOTE3NS90YXNrdGVybWluYXRvcicpO1xuLy9jb25zdCBjb25uZWN0aW9uID0gIG1vbmdvb3NlLmNvbm5lY3QoJ21vbmdvZGI6Ly9sb2NhbGhvc3QvdGVybWluYXRvcicpO1xubW9uZ29vc2UuY29ubmVjdGlvbi5vbmNlKCdjb25uZWN0ZWQnLCBmdW5jdGlvbigpIHtcbiAgY29uc29sZS5sb2coJ2Nvbm5lY3RlZCB0byBkYicpO1xufSk7XG5cbi8vLS0tLS0tLS0tLS1QYXNzcG9ydCBGYWNlYm9vayBBdXRoZW50aWNhdGlvbi0tLS0tLS0tLS0tLy9cbi8vYXBwLnVzZShzZXNzaW9uKHtcbi8vICAgIHNlY3JldDogXCJzMG0zdGgxblwiLFxuLy8gICAgcmVzYXZlOiBmYWxzZSxcbi8vICAgIHNhdmVVbmluaXRpYWxpemVkOiBmYWxzZSxcbi8vfSkpO1xuLy8gYXBwLnVzZShwYXNzcG9ydC5pbml0aWFsaXplKCkpO1xuLy8gYXBwLnVzZShwYXNzcG9ydC5zZXNzaW9uKCkpO1xuLy9cbi8vIHBhc3Nwb3J0LnVzZShuZXcgRmFjZWJvb2tTdHJhdGVneSh7XG4vLyAgICAgY2xpZW50SUQ6IHNlY3JldC5mYi5jbGllbnRJRCxcbi8vICAgICBjbGllbnRTZWNyZXQ6IHNlY3JldC5mYi5jbGllbnRTZWNyZXQsXG4vLyAgICAgY2FsbGJhY2tVUkw6IFwiaHR0cDovL2xvY2FsaG9zdDpcIitwb3J0K1wiL2FwaS9hdXRoL2NhbGxiYWNrXCIsXG4vLyAgICAgcHJvZmlsZUZpZWxkczogWydpZCcsICdlbWFpbCcsICdnZW5kZXInLCAnbGluaycsICdsb2NhbGUnLCAnbmFtZScsICd0aW1lem9uZScsICd1cGRhdGVkX3RpbWUnLCAndmVyaWZpZWQnXVxuLy8gICAgIH0sICBmdW5jdGlvbihhY2Nlc3NUb2tlbiwgcmVmcmVzaFRva2VuLCBwcm9maWxlLCBkb25lKSB7XG4vLyAgIFx0ICAgIFx0cHJvY2Vzcy5uZXh0VGljayhmdW5jdGlvbigpe1xuLy8gICBcdCAgICBcdFx0VXNlci5maW5kT25lKHsnZmFjZWJvb2suaWQnOiBwcm9maWxlLmlkfSwgZnVuY3Rpb24oZXJyLCB1c2VyKXtcbi8vICAgXHQgICAgXHRcdFx0aWYoZXJyKVxuLy8gICBcdCAgICBcdFx0XHRcdHJldHVybiBkb25lKGVycik7XG4vLyAgIFx0ICAgIFx0XHRcdGlmKHVzZXIpXG4vLyAgIFx0ICAgIFx0XHRcdFx0cmV0dXJuIGRvbmUobnVsbCwgdXNlcik7XG4vLyAgIFx0ICAgIFx0XHRcdGVsc2Uge1xuLy8gICBcdCAgICBcdFx0XHRcdHZhciBuZXdVc2VyID0gbmV3IFVzZXIoKTtcbi8vICAgXHQgICAgXHRcdFx0XHRuZXdVc2VyLmZhY2Vib29rLmlkID0gcHJvZmlsZS5pZDtcbi8vICAgXHQgICAgXHRcdFx0XHRuZXdVc2VyLmZhY2Vib29rLnRva2VuID0gYWNjZXNzVG9rZW47XG4vLyAgIFx0ICAgIFx0XHRcdFx0bmV3VXNlci5mYWNlYm9vay5uYW1lID0gcHJvZmlsZS5fanNvbi5maXJzdF9uYW1lICsgXCIgXCIgKyBwcm9maWxlLl9qc29uLmxhc3RfbmFtZTtcbi8vICAgICAgICAgICAgICAgICBuZXdVc2VyLmZhY2Vib29rLmVtYWlsID0gcHJvZmlsZS5fanNvbi5lbWFpbDtcbi8vXG4vLyAgIFx0ICAgIFx0XHRcdFx0bmV3VXNlci5zYXZlKGZ1bmN0aW9uKGVycil7XG4vLyAgIFx0ICAgIFx0XHRcdFx0XHRpZihlcnIpXG4vLyAgIFx0ICAgIFx0XHRcdFx0XHRcdHRocm93IGVycjtcbi8vICAgXHQgICAgXHRcdFx0XHRcdHJldHVybiBkb25lKG51bGwsIG5ld1VzZXIpO1xuLy8gICBcdCAgICBcdFx0XHRcdH0pXG4vLyAgIFx0ICAgIFx0XHRcdFx0Y29uc29sZS5sb2codXNlcik7XG4vLyAgIFx0ICAgIFx0XHRcdH1cbi8vICAgXHQgICAgXHRcdH0pO1xuLy8gICBcdCAgICBcdH0pO1xuLy8gICBcdCAgICB9XG4vL1xuLy8gKSk7XG5cbi8vLS0tLS0tLS0tLS1QYXNzcG9ydCBMb2NhbCBBdXRoZW50aWNhdGlvbi0tLS0tLS0tLS0tLy9cblxuLy8gcGFzc3BvcnQudXNlKG5ldyBMb2NhbFN0cmF0ZWd5KFxuLy8gICBmdW5jdGlvbih1c2VybmFtZSwgcGFzc3dvcmQsIGRvbmUpIHtcbi8vICAgICBVc2VyLmZpbmRPbmUoeyB1c2VybmFtZTogdXNlcm5hbWUgfSwgZnVuY3Rpb24gKGVyciwgdXNlcikge1xuLy8gICAgICAgaWYgKGVycikge1xuLy8gICAgICAgICByZXR1cm4gZG9uZShlcnIpO1xuLy8gICAgICAgfVxuLy8gICAgICAgaWYgKCF1c2VyKSB7XG4vLyAgICAgICAgIHJldHVybiBkb25lKG51bGwsIGZhbHNlKTtcbi8vICAgICAgIH1cbi8vICAgICAgIGlmICghdXNlci52ZXJpZnlQYXNzd29yZChwYXNzd29yZCkpIHtcbi8vICAgICAgICAgcmV0dXJuIGRvbmUobnVsbCwgZmFsc2UpO1xuLy8gICAgICAgfVxuLy9cbi8vICAgICAgIHJldHVybiBkb25lKG51bGwsIHVzZXIpO1xuLy8gICAgIH0pO1xuLy8gICB9XG4vLyApKTtcblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xuXG4vLyB2YXIgcmVxdWlyZUF1dGggPSBmdW5jdGlvbihyZXEsIHJlcywgbmV4dCkge1xuLy8gICBpZiAoIXJlcS5pc0F1dGhlbnRpY2F0ZWQoKSkge1xuLy8gICAgIHJlcy5yZWRpcmVjdCgnLyMvbG9naW4nKTtcbi8vICAgfVxuLy8gICBlbHNlIHsgbmV4dCgpOyB9XG4vLyB9O1xuXG4vLyBhcHAuZ2V0KFwiL2FwaS9hdXRoL1wiLCBwYXNzcG9ydC5hdXRoZW50aWNhdGUoXCJmYWNlYm9va1wiKSk7XG4vLyBhcHAuZ2V0KFwiL2FwaS9hdXRoL2NhbGxiYWNrXCIsIHBhc3Nwb3J0LmF1dGhlbnRpY2F0ZShcImZhY2Vib29rXCIsIHtcbi8vICAgICBzdWNjZXNzUmVkaXJlY3Q6IFwiLyMvdXNlci9kYXNoYm9hcmRcIixcbi8vICAgICBmYWlsdXJlUmVkaXJlY3Q6IFwiLyMvbG9naW5cIlxuLy8gfSkpO1xuLy9cbi8vIHBhc3Nwb3J0LnNlcmlhbGl6ZVVzZXIoZnVuY3Rpb24odXNlciwgZG9uZSl7XG4vLyAgICAgZG9uZShudWxsLCB1c2VyKTtcbi8vIH0pO1xuLy8gcGFzc3BvcnQuZGVzZXJpYWxpemVVc2VyKGZ1bmN0aW9uKG9iaiwgZG9uZSl7XG4vLyAgICAgZG9uZShudWxsLCBvYmopO1xuLy8gfSk7XG4vL1xuLy8gYXBwLmdldChcIi9tZVwiLCByZXF1aXJlQXV0aCwgZnVuY3Rpb24ocmVxLCByZXMpe1xuLy8gICAgIHJlcy5qc29uKHJlcS51c2VyKTtcbi8vIH0pO1xuLy9cbi8vIGFwcC5nZXQoXCIvY2hlY2tsb2dnZWRcIiwgZnVuY3Rpb24ocmVxLCByZXMpe1xuLy8gICAgIHJlcy5zZW5kKHJlcS5pc0F1dGhlbnRpY2F0ZWQoKSA/IHJlcS51c2VyIDogJzAnKTtcbi8vIH0pO1xuLy9cbi8vIGFwcC5nZXQoJy9sb2dvdXQnLGZ1bmN0aW9uKHJlcSwgcmVzKSB7XG4vLyAgIHJlcS5sb2dvdXQoKTtcbi8vICAgcmVzLnJlZGlyZWN0KCcvIy9sb2dpbicpO1xuLy8gfSlcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
