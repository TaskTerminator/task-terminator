angular.module('terminatorApp').service('YourTeamSvc', function($http, $q) {

  ////////////////////////
  // Employee Calls
  ////////////////////////

    this.getEmployees = function () {

      var defer = $q.defer();

      $http({
        method: "GET",
        url: "/api/employee"
      }).then(function(response) {
        defer.resolve(response);
      }, function (error) {
        console.log("error: ", error);
      });

      return defer.promise;
    }

    this.getOneEmployee = function (id) {

      var defer = $q.defer();

      $http({
        method: "GET",
        url: "/api/employee/" + id
      }).then(function(response) {
        defer.resolve(response);
      }, function (error) {
        console.log("error: ", error);
      });

      return defer.promise;
    }

    this.postEmployee = function () {
      var defer = $q.defer();

      $http({
        method: "POST",
        url: "/api/employee",
        data: {}
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
        url: "/api/employee/" + id,
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
        url: "/api/employee/" + id
      }).then(function(response) {
        defer.resolve(response);
      }, function (error) {
        console.log("error: ", error);
      });

      return defer.promise;;
    };

});
