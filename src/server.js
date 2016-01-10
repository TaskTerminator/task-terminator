const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
// const FacebookStrategy = require('passport-facebook').Strategy;
// const secret = require("./secret");
// const bcrypt = require('bcrypt-nodejs');

const app = express();
const port = 8000;

//********** CONTROLLERS **********
const companyCtrl = require('./server_assets/controllers/companyCtrl.js');
const departmentCtrl = require('./server_assets/controllers/departmentCtrl.js');
const employeeCtrl = require('./server_assets/controllers/employeeCtrl.js');
const positionCtrl = require('./server_assets/controllers/positionCtrl.js');
const projectCtrl = require('./server_assets/controllers/projectCtrl.js');
const templateCtrl = require('./server_assets/controllers/templateCtrl.js');

mongoose.Promise = require('q').Promise;

//----------Fluff------------//
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(__dirname+'/Public'));
app.listen(port, function () {
  console.log("Listening on port: " + port);
});

//********** COMPANY ENDPOINTS **********
app.post('/api/company', companyCtrl.newCompany);

//********** DEPARTMENT ENDPOINTS **********
app.post('/api/department', departmentCtrl.newDepartment);

//********** EMPLOYEE ENDPOINTS **********
app.post('/api/employee', employeeCtrl.newEmployee);

//********** POSITION ENDPOINTS **********
app.post('api/position', positionCtrl.newPosition);

//********** PROJECT ENDPOINTS **********
app.post('api/project', projectCtrl.newProject);

//********** TASK ENDPOINTS **********


//********** TEMPLATE ENDPOINTS **********
app.post('api/template', templateCtrl.newTemplate);




//-----------Connection to database-----------//
mongoose.connect('mongodb://taskterminator:devmountain@ds039175.mongolab.com:39175/taskterminator');
// mongoose.connect('mongodb://localhost/terminator')
mongoose.connection.once('connected', function() {
  console.log('connected to db');
});

//-----------Passport Facebook Authentication-----------//
app.use(session({
    secret: "s0m3th1n",
    resave: false,
    saveUninitialized: false,
}));
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
