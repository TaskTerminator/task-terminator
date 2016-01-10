angular.module('terminatorApp').service('ProjectsSvc', function($http, $q) {

  this.getProjects = function () {

    var defer = $q.defer();

    $http({
      method: "GET",
      url: "/api/project"
    }).then(function(response) {
      defer.resolve(response);
    }, function (error) {
      console.log("error: ", error);
    });

    return defer.promise;
  }

  this.getOneProject = function (id) {

    var defer = $q.defer();

    $http({
      method: "GET",
      url: "/api/project/" + id
    }).then(function(response) {
      defer.resolve(response);
    }, function (error) {
      console.log("error: ", error);
    });

    return defer.promise;
  }

  this.getProjectTask = function (id) {

    var defer = $q.defer();

    $http({
      method: "GET",
      url: "/api/task/project/" + id
    }).then(function(response) {
      defer.resolve(response);
    }, function (error) {
      console.log("error: ", error);
    });

    return defer.promise;
  }

  this.postProject = function () {
    var defer = $q.defer();

    $http({
      method: "POST",
      url: "/api/project",
      data: {}
    }).then(function(response) {
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
      url: "/api/project/" + id,
      data: {}
    }).then(function(response) {
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
      url: "/api/project/" + id
    }).then(function(response) {
      defer.resolve(response);
    }, function (error) {
      console.log("error: ", error);
    });

    return defer.promise;;
  };


});
