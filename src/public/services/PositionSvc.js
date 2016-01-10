angular.module('terminatorApp').service('PositionSvc', function($http, $q) {

  ////////////////////////
  // Position Calls
  ////////////////////////

  this.getPositions = function () {

    var defer = $q.defer();

    $http({
      method: "GET",
      url: "/api/position"
    }).then(function(response) {
      defer.resolve(response);
    }, function (error) {
      console.log("error: ", error);
    });

    return defer.promise;
  };

  this.getOnePosition = function (id) {

    var defer = $q.defer();

    $http({
      method: "GET",
      url: "/api/position/" + id
    }).then(function(response) {
      defer.resolve(response);
    }, function (error) {
      console.log("error: ", error);
    });

    return defer.promise;
  };

  this.getPositionTask = function (id) {

    var defer = $q.defer();

    $http({
      method: "GET",
      url: "/api/tasks/position/" + id
    }).then(function(response) {
      defer.resolve(response);
    }, function (error) {
      console.log("error: ", error);
    });

    return defer.promise;
  };

  this.postPosition = function () {
    var defer = $q.defer();

    $http({
      method: "POST",
      url: "/api/position",
      data: {}
    }).then(function(response) {
      defer.resolve(response);
    }, function (error) {
      console.log("error: ", error);
    });

    return defer.promise;
  };

  this.editPosition = function () {
    var defer = $q.defer();

    $http({
      method: "PUT",
      url: "/api/position/" + id,
      data: {}
    }).then(function(response) {
      defer.resolve(response);
    }, function (error) {
      console.log("error: ", error);
    });

    return defer.promise;
  };

  this.deletePosition = function (id) {
    var defer = $q.defer();

    $http({
      method: "DELETE",
      url: "/api/position/" + id
    }).then(function(response) {
      defer.resolve(response);
    }, function (error) {
      console.log("error: ", error);
    });

    return defer.promise;
  };


});
