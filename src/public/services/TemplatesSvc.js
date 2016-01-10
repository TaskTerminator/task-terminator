angular.module('terminatorApp').service('TemplatesSvc', function($http, $q) {

////////////////////////
// Task Template Calls
////////////////////////
  this.getTaskTemplates = function () {

    var defer = $q.defer();

    $http({
      method: "GET",
      url: "/api/tasks/template"
    }).then(function(response) {
      defer.resolve(response);
    }, function (error) {
      console.log("error: ", error);
    });

    return defer.promise;
  }

  this.getOneTaskTemplate = function (id) {

    var defer = $q.defer();

    $http({
      method: "GET",
      url: "/api/tasks/template/" + id
    }).then(function(response) {
      defer.resolve(response);
    }, function (error) {
      console.log("error: ", error);
    });

    return defer.promise;
  }

  this.postTaskTemplate = function () {
    var defer = $q.defer();

    $http({
      method: "POST",
      url: "/api/tasks/template",
      data: {}
    }).then(function(response) {
      defer.resolve(response);
    }, function (error) {
      console.log("error: ", error);
    });

    return defer.promise;
  };

  this.editTaskTemplate = function () {
    var defer = $q.defer();

    $http({
      method: "PUT",
      url: "/api/tasks/template/" + id,
      data: {}
    }).then(function(response) {
      defer.resolve(response);
    }, function (error) {
      console.log("error: ", error);
    });

    return defer.promise;
  };

  this.deleteTaskTemplate = function (id) {
    var defer = $q.defer();

    $http({
      method: "DELETE",
      url: "/api/tasks/template/" + id
    }).then(function(response) {
      defer.resolve(response);
    }, function (error) {
      console.log("error: ", error);
    });

    return defer.promise;;
  };

  ////////////////////////
  // Project Template Calls
  ////////////////////////

  this.getProjectTemplates = function () {

    var defer = $q.defer();

    $http({
      method: "GET",
      url: "/api/template"
    }).then(function(response) {
      defer.resolve(response);
    }, function (error) {
      console.log("error: ", error);
    });

    return defer.promise;
  }

  this.getOneProjectTemplate = function (id) {

    var defer = $q.defer();

    $http({
      method: "GET",
      url: "/api/template/" + id
    }).then(function(response) {
      defer.resolve(response);
    }, function (error) {
      console.log("error: ", error);
    });

    return defer.promise;
  }

  this.postProjectTemplate = function () {
    var defer = $q.defer();

    $http({
      method: "POST",
      url: "/api/template",
      data: {}
    }).then(function(response) {
      defer.resolve(response);
    }, function (error) {
      console.log("error: ", error);
    });

    return defer.promise;
  };

  this.editProjectTemplate = function () {
    var defer = $q.defer();

    $http({
      method: "PUT",
      url: "/api/template/" + id,
      data: {}
    }).then(function(response) {
      defer.resolve(response);
    }, function (error) {
      console.log("error: ", error);
    });

    return defer.promise;
  };

  this.deleteProjectTemplate = function (id) {
    var defer = $q.defer();

    $http({
      method: "DELETE",
      url: "/api/template/" + id
    }).then(function(response) {
      defer.resolve(response);
    }, function (error) {
      console.log("error: ", error);
    });

    return defer.promise;;
  };

});
