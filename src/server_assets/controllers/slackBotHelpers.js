const mongoose = require('mongoose');
const Position = require('../models/Position.js');
const Company = require('../models/Company.js');
const Department = require('../models/Department.js');
const Employee = require('../models/Employee.js');
const Q = require('q');

module.exports = {

    arrayMaker: function(array){
      var deferred = Q.defer();
      console.log("I'm trying to make an array!");
      var madeArray = [];
      for (var i = 0; i < array.length; i ++){
        console.log("Here's the name I'm looking at....", array[i].name);
        madeArray.push(array[i].name);
      }
      console.log("Here's the full array I made and am trying to return", madeArray);
      deferred.resolve(madeArray);
      console.log("This is the deferred promise", deferred.promise);
      return deferred.promise;
    },

    arrayMakerEmployeeName: function(array){
      var deferred = Q.defer();
      console.log("I'm trying to make an array!",array);
      var madeArray = [];
      for (var i = 0; i < array.length; i ++){
        console.log("Here's the name I'm looking at....", array[i].identification.name.fullName);
        madeArray.push(array[i].identification.name.fullName);
      }
      console.log("Here's the full array I made and am trying to return", madeArray);
      deferred.resolve(madeArray);
      console.log("This is the deferred promise", deferred.promise);
      return deferred.promise;
    },

    attachmentMaker: function(array,attachmentTitle){
      console.log("Here's the array to be turned into an attachement", array, attachmentTitle);
      var deferred = Q.defer();
      console.log("I'm trying to make a nice attachment for you....");
      var attachment = {
        title: attachmentTitle,
        color: '#7FEFBD',
        fields: [],
      };

      for(var j = 0; j < array.length; j ++){
        attachment.fields.push({
          label: 'Field',
          value: array[j],
          short: true
        });
      }
      console.log(attachment);
      deferred.resolve(attachment);
      return deferred.promise;
    },

    allPositions: function(req, res) {
      var deferred = Q.defer();
      Position.find().exec()
        .then((positions) => {
          deferred.resolve(positions);
      }).catch((err) => {
        return res.status(500).end();
      });
      return deferred.promise;
    },

    allDepartments: function(req, res) {
      var deferred = Q.defer();
      Department.find().exec()
        .then((departments) => {
          deferred.resolve(departments);
      }).catch((err) => {
        return res.status(500).end();
      });
      return deferred.promise;
    },

    allEmployees: function(req, res) {
      var deferred = Q.defer();
      Employee.find().exec()
        .then((employees) => {
          deferred.resolve(employees);
      }).catch((err) => {
        return res.status(500).end();
      });
      return deferred.promise;
    },



    // makeTemplateTaskObject(id, associatedProjectId) {
    //   console.log("#18 - Made it to Template Task Object");
    //   var deferred = Q.defer();
    //   TemplateTask.findById(id)
    //     .exec()
    //     .then((returnedTask) => {
    //       const task_plain = returnedTask.toObject();
    //       delete task_plain._id;
    //       delete task_plain.__v;
    //       delete task_plain.date.created;
    //       deferred.resolve(task_plain);
    //     });
    //   return deferred.promise;
    // },
};
