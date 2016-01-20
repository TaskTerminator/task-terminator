angular.module('terminatorApp').service('TemplatesSvc', function($http, $q) {

////////////////////////
//  Template Calls
////////////////////////
  this.getTemplates = function () {

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
  };

  this.getOneTemplate = function (id) {

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
  };

  this.postTemplate = function (newTemplate) {
    var defer = $q.defer();

    $http({
      method: "POST",
      url: "/api/template",
      data: newTemplate
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
      url: "/api/tasks/template/" + id,
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
      url: "/api/tasks/template/" + id
    }).then(function(response) {
      defer.resolve(response);
    }, function (error) {
      console.log("error: ", error);
    });

    return defer.promise;
  };

  ////////////////////////
  // Task Template Calls
  ////////////////////////

  this.postTasks = function (newTasksArr, id) {
    console.log("TemplatesSvc");
    var defer = $q.defer();

    $http({
      method: "POST",
      url: "/api/template/"+ id +"/tasks",
      data: newTasksArr
    }).then(function(response) {
      defer.resolve(response);
    }, function (error) {
      console.log("error: ", error);
    });

    return defer.promise;
  }

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

  this.getCompanies = function () {

    var defer = $q.defer();

    $http({
      method: "GET",
      url: "/api/company"
    }).then(function(response) {
      defer.resolve(response);
    }, function (error) {
      console.log("error: ", error);
    });

    return defer.promise;
  }

});
