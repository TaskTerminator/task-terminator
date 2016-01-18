angular.module('terminatorApp').service('YourTeamSvc', function($http, $q) {

  ////////////////////////
  // Employee Calls
  ////////////////////////

    this.getEmployees = function () {

      var defer = $q.defer();

      $http({
        method: "GET",
        url: "api/569533191bfb3ca903f17803/employee"
      }).then(function(response) {
        defer.resolve(response);
      }, function (error) {
        console.log("error: ", error);
      });

      return defer.promise;
    };

    this.getOneEmployee = function (id) {

      var defer = $q.defer();

      $http({
        method: "GET",
        url: "api/569533191bfb3ca903f17803/employee" + id
      }).then(function(response) {
        defer.resolve(response);
      }, function (error) {
        console.log("error: ", error);
      });

      return defer.promise;
    };

    this.postEmployee = function (newEmployee) {
      var defer = $q.defer();

      $http({
        method: "POST",
        url: "api/569533191bfb3ca903f17803/569553970a39481510b6bf84/569553ff0a39481510b6bf87/employee",
        data: newEmployee
      }).then(function(response) {
        defer.resolve(response);
      }, function (error) {
        console.log("error: ", error);
      });

      return defer.promise;
    };

    this.editEmployee = function () {
      var defer = $q.defer();

      $http({
        method: "PUT",
        url: "api/569533191bfb3ca903f17803/employee" + id,
        data: {}
      }).then(function(response) {
        defer.resolve(response);
      }, function (error) {
        console.log("error: ", error);
      });

      return defer.promise;
    };

    this.deleteEmployee = function (id) {
      var defer = $q.defer();

      $http({
        method: "DELETE",
        url: "api/569533191bfb3ca903f17803/employee" + id
      }).then(function(response) {
        defer.resolve(response);
      }, function (error) {
        console.log("error: ", error);
      });

      return defer.promise;
    };

});
