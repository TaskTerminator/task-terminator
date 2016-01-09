'use strict';

angular.module('terminatorApp').service('EmployeeSvc', function ($http, $q) {

  this.getEmployees = function () {

    var defer = $q.defer();

    $http({
      method: "GET",
      url: "/api/client"
    }).then(function (response) {
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
      url: "/api/client/" + id
    }).then(function (response) {
      defer.resolve(response);
    }, function (error) {
      console.log("error: ", error);
    });

    return defer.promise;
  };

  this.postEmployee = function () {
    var defer = $q.defer();

    $http({
      method: "POST",
      url: "/api/client",
      data: {}
    }).then(function (response) {
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
      url: "/api/client/" + id,
      data: {}
    }).then(function (response) {
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
      url: "/api/client/" + id
    }).then(function (response) {
      defer.resolve(response);
    }, function (error) {
      console.log("error: ", error);
    });

    return defer.promise;;
  };
});