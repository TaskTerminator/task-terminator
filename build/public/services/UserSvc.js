'use strict';

angular.module('terminatorApp').service('UserSvc', function ($http, $q) {

  this.getUser = function () {

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

  this.getOneProject = function (id) {

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

  this.postProject = function () {
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

  this.editProject = function () {
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

  this.deleteProject = function (id) {
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