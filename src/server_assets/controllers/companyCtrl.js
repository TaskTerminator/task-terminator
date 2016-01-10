const mongoose = require('mongoose');
const Department = require('../models/Department.js');



module.exports = {

newCompany: function(req,res){
  console.log("POST - ADD COMPANY ENDPOINT");
  return res.status(200).end();
}

// addCoApplicant: function(req, res) {
//   // console.log("ADD CO-APPLICANT POST REQUEST");
//   //Initialize a new Applicant object according to the Applicant mongoose schema standards.
//   //This allows us to access the ID property before saving
//   var coApplicant = new Applicant(req.body);
//   coApplicant.application = req.params.id;
//   coApplicant.fullName = coApplicant.firstName + " " + coApplicant.lastName;
//
//   //Convert the incoming phone number to necessary E164 format for twilio
//   coApplicant.phoneNum = phoneFormat.formatE164("US", req.body.phoneNum);
//
//   //Use the params.id to look up the associated application and push the id of the Applicant object
//   //to the applicants array value of the applications object
//   console.log("CO APPLICANT ID", coApplicant._id);
//   Application
//     .findOne({
//       _id: req.params.id
//     })
//     .exec()
//     .then(function(result) {
//       console.log(result);
//       result.applicants.push(coApplicant._id);
//       appId = result._id;
//       result.save();
//       // console.log(result);
//     });
//
//
//   //Save the co-applicant to the database and return a 201 status to the client
//   coApplicant.save().then(function(err, result) {
//     googl.shorten('http://www.slantsixdigital.com/#/references/add/' + coApplicant._id)
//       .then(function(shortUrl) {
//         // console.log(shortUrl);
//         //Send the Co-Applicant a text message outlining the next steps
//         twilio.sendMessage({
//           to: req.body.phoneNum,
//           from: '+19722998483',
//           body: "Hi " + req.body.firstName + "\n\nYou were added as a co-applicant on an auto loan with VP Auto Sales.\n\nThe next step to complete your application is to add references. These are folks who know you and can help us verify some basic information.\n\nAs you add references, we'll contact them via text message and ask them to call our reference hotline.\n\nWe can't finshed your application without completed references, so you may want to let your references know that the faster they call the hotline the faster we can process your application.\n\nYou can add your references by clicking this link : " + shortUrl
//         }, function(err, responseData) {
//           if (!err) {
//             console.log(err);
//           }
//           // console.log("TWILIO TEXT SENT");
//         });
//       })
//       .catch(function(err) {
//         console.error(err.message);
//       });
//   });
//   return res.status(201).end();
// },




};
