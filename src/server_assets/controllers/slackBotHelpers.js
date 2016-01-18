const mongoose = require('mongoose');
const Position = require('../models/Position.js');
const Company = require('../models/Company.js');
const Department = require('../models/Department.js');
const Employee = require('../models/Employee.js');
const Project = require('../models/Project.js');
const ProjectTask = require('../models/ProjectTask.js');
const Q = require('q');
const moment = require('moment');

module.exports = {

  /************** ARRAYS **************/

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

/************** ATTACHMENTS **************/

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

    helpAttachment: function(array,attachmentTitle){
      console.log("Here's the array to be turned into an attachement", array, attachmentTitle);
      var deferred = Q.defer();
      console.log("I'm trying to make a nice attachment for you....");
      var attachment = {
        title: attachmentTitle,
        color: '#7FEFBD',
        fields: [{
          label: 'Field',
          title: ' ',
          value: "Hi.\n I didn't understand what you want. \nBut don't worry... I'm here to help. \nBefore you panic check out this list of commands to get the info you need. Because I'm artifically intelligent, if you type anything close to the commands below I'll probably give you what your looking for. If not, just type the closest command exactly. Over time I'll get better and better at understanding your intent, so get to work!\n",
          short: false,
        },
        {
          label: 'Field',
          value: ' ',
          short: true,
        },{
          label: 'Field',
          value: ' ',
          short: true,
        },
        {
          label: 'Field',
          value: '*Command*',
          short: true,
        },{
          label: 'Field',
          value: '*Description*',
          short: true,
        }],
        mrkdwn_in: ['fields']
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

    projectsAttachment: function(array,attachmentTitle){
      console.log("Here's the array to be turned into an attachement", array, attachmentTitle);
      var deferred = Q.defer();
      console.log("I'm trying to make a nice attachment for you....");
      var attachment = {
        title: attachmentTitle,
        color: '#7FEFBD',
        fields: [],
        mrkdwn_in: ['fields']
      };

      for(var j = 0; j < array.length; j ++){
        attachment.fields.push({
          label: 'Field',
          value: "_#" + array[j].friendlyId + "_: *" + array[j].name + "* - " + array[j].description + " - *Due : *" + moment(array[j].setup.dueDate.actual).format('dddd, MMMM Do'),
          short: false
        });
      }
      console.log(attachment);
      deferred.resolve(attachment);
      return deferred.promise;
    },

    /************** FORMATTING **************/

    hashStripper: function(id){
      console.log("Here's the id I'm trying to fix", id);
      var deferred = Q.defer();
      var cleanId = id.split('#');
      deferred.resolve(cleanId[1]);
      return deferred.promise;
    },


    /************** QUERIES - DEPARTMENTS  **************/
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

    /************** QUERIES - EMPLOYEES  **************/
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

    /************** QUERIES - POSITIONS  **************/
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



    /************** QUERIES - PROJECTS  **************/
    allProjects: function(req, res) {
      var deferred = Q.defer();
      Project.find().exec()
        .then((projects) => {
          console.log("Here's the projects I found...",projects);
          deferred.resolve(projects);
      }).catch((err) => {
        return res.status(500).end();
      });
      console.log(deferred.promise);
      return deferred.promise;
    },

    /************** QUERIES - PROJECT TASKS  **************/
    allProjectTasks: function(req,res){
      console.log("Made it to all project tasks!");
    var deferred = Q.defer();
    ProjectTask.find().exec().then((results) => {
      console.log("This is what I found for all the tasks", results);
      deferred.resolve(results);
      }).catch((err) => {
        return res.status(500).end();
      });
      return deferred.promise;
    },

    tasksInProject : function(id){
      console.log("Here's the id I'm looking for", id);
      var deferred = Q.defer();
      Project.find({"friendlyId":id})
      .exec()
      .then((result)=>{
        console.log("did i find a project?", result);
        deferred.resolve(result);
      }).catch((err)=> {
        return res.status(500).end();
      });
      return deferred.promise;
    }








};
