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
  };

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
  };

  this.getProjectTask = function (id) {

    var defer = $q.defer();

    $http({
      method: "GET",
      url: "/api/tasks/project/" + id
    }).then(function(response) {
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
      url: "/api/project",
      data: {}
    }).then(function(response) {
      defer.resolve(response);
    }, function (error) {
      console.log("error: ", error);
    });

    return defer.promise;
  };

  this.postSingleProject = function (newSingleProject) {
    var defer = $q.defer();

    $http({
      method: "POST",
      url: "/api/project",
      data: newSingleProject
    }).then(function(response) {
      defer.resolve(response);
    }, function (error) {
      console.log("error: ", error);
    });

    return defer.promise;
  };

  this.postIntervalProject = function (newSingleProject) {
    var defer = $q.defer();

    $http({
      method: "POST",
      url: "/api/project",
      data: newSingleProject
    }).then(function(response) {
      defer.resolve(response);
    }, function (error) {
      console.log("error: ", error);
    });

    return defer.promise;
  };

  this.activateTemplates = function (id, description) {
    var defer = $q.defer();
    $http({
      method: "POST",
      url: "/api/project/" + id,
      data: {
        description: description,
      }
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

    return defer.promise;
  };

  ///////////////
  //Templates
  ///////////////

  this.postTemplate = function (newTemplate) {
    console.log(newTemplate);
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

  this.getTemplates = function () {

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
  };

  this.postTasks = function (newTasksArr, id) {
    console.log("TemplatesSvc");
    var defer = $q.defer();

    $http({
      method: "POST",
      url: "/api/template/tasks",
      data: newTasksArr
    }).then(function(response) {
      defer.resolve(response);
    }, function (error) {
      console.log("error: ", error);
    });

    return defer.promise;
  };

  this.getTemplateTasks = function (id) {
    var defer = $q.defer();

    $http({
      method: "GET",
      url: "/api/tasks/template/" + id,
      }).then(function(response) {
        defer.resolve(response);
      }, function (error) {
        console.log("error: ", error);
      });
  }

  ///////////
  //Scheduled
  //////////


this.postScheduledProject = function (newScheduled) {
    console.log(newScheduled);
    var defer = $q.defer();

    $http({
      method: "POST",
      //url: "/api/template",
      data: newTemplate
    }).then(function(response) {
      defer.resolve(response);
    }, function (error) {
      console.log("error: ", error);
    });

    return defer.promise;
  };

  this.postSingleProject = function (singleProject) {
    console.log(singleProject);
    var defer = $q.defer();

    $http({
      method: "POST",
      //url: "/api/template",
      data: newTemplate
    }).then(function(response) {
      defer.resolve(response);
    }, function (error) {
      console.log("error: ", error);
    });

    return defer.promise;
  };



});
