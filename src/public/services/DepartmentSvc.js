angular.module('terminatorApp').service('DepartmentSvc', function($http, $q) {

  ////////////////////////
  // Department Calls
  ////////////////////////

  this.getDepartments = function () {

    var defer = $q.defer();

    $http({
      method: "GET",
      url: "/api/department"
    }).then(function(response) {
      defer.resolve(response);
    }, function (error) {
      console.log("error: ", error);
    });

    return defer.promise;
  }

  this.getOneDepartment = function (id) {

    var defer = $q.defer();

    $http({
      method: "GET",
      url: "/api/department/" + id
    }).then(function(response) {
      defer.resolve(response);
    }, function (error) {
      console.log("error: ", error);
    });

    return defer.promise;
  }

  this.getDepartmentTask = function (id) {

    var defer = $q.defer();

    $http({
      method: "GET",
      url: "/api/task/department/" + id
    }).then(function(response) {
      defer.resolve(response);
    }, function (error) {
      console.log("error: ", error);
    });

    return defer.promise;
  }

  this.postDepartment = function () {
    var defer = $q.defer();

    $http({
      method: "POST",
      url: "/api/department",
      data: {}
    }).then(function(response) {
      defer.resolve(response);
    }, function (error) {
      console.log("error: ", error);
    });

    return defer.promise;
  };

  this.editDepartment = function () {
    var defer = $q.defer();

    $http({
      method: "PUT",
      url: "/api/department/" + id,
      data: {}
    }).then(function(response) {
      defer.resolve(response);
    }, function (error) {
      console.log("error: ", error);
    });

    return defer.promise;
  };

  this.deleteDepartment = function (id) {
    var defer = $q.defer();

    $http({
      method: "DELETE",
      url: "/api/department/" + id
    }).then(function(response) {
      defer.resolve(response);
    }, function (error) {
      console.log("error: ", error);
    });

    return defer.promise;;
  };


});
