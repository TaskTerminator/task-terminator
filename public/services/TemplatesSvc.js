angular.module('terminatorApp').service('TemplatesSvc', function($http, $q) {

  this.getTemplates = function () {

    var defer = $q.defer();

    $http({
      method: "GET",
      url: "/api/client"
    }).then(function(response) {
      defer.resolve(response);
    }, function (error) {
      console.log("error: ", error);
    });

    return defer.promise;
  }

  this.getOneTemplate = function (id) {

    var defer = $q.defer();

    $http({
      method: "GET",
      url: "/api/client/" + id
    }).then(function(response) {
      defer.resolve(response);
    }, function (error) {
      console.log("error: ", error);
    });

    return defer.promise;
  }

  this.postTemplate = function () {
    var defer = $q.defer();

    $http({
      method: "POST",
      url: "/api/client",
      data: {}
    }).then(function(response) {
      defer.resolve(response);
    }, function (error) {
      console.log("error: ", error);
    });

    return defer.promise;
  };

  this.editTemplate = function () {
    var defer = $q.defer();

    $http({
      method: "PUT",
      url: "/api/client/" + id,
      data: {}
    }).then(function(response) {
      defer.resolve(response);
    }, function (error) {
      console.log("error: ", error);
    });

    return defer.promise;
  };

  this.deleteTemplate = function (id) {
    var defer = $q.defer();

    $http({
      method: "DELETE",
      url: "/api/client/" + id
    }).then(function(response) {
      defer.resolve(response);
    }, function (error) {
      console.log("error: ", error);
    });

    return defer.promise;;
  };

});
