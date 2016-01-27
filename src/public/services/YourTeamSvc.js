angular.module('terminatorApp').service('YourTeamSvc', function($http, $q) {

  ////////////////////////
  // Employee Calls
  ////////////////////////

    this.getEmployees = function (companyId) {

      var defer = $q.defer();

      $http({
        method: "GET",
        url: `api/${companyId}/employee`
      }).then(function(response) {
        defer.resolve(response);
      }, function (error) {
        console.log("error: ", error);
      });

      return defer.promise;
    };

    this.getOneEmployee = function (companyId, id) {

      var defer = $q.defer();

      $http({
        method: "GET",
        url: `api/${companyId}/employee/${id}`
      }).then(function(response) {
        defer.resolve(response);
      }, function (error) {
        console.log("error: ", error);
      });

      return defer.promise;
    };

    this.postEmployee = function (newEmployee, companyId) {
      console.log(newEmployee)
      var defer = $q.defer();
      $http({
        method: "POST",
        url: `api/${companyId}/${newEmployee.departments[0]._id}/${newEmployee.positions._id}/employee`,
        data: newEmployee
      }).then(function(response) {
        defer.resolve(response);
      }, function (error) {
        console.log("error: ", error);
      });

      return defer.promise;
    };

    this.editEmployee = function (employee) {
      var defer = $q.defer();

      $http({
        method: "PUT",
        url: "api/employee/" + employee._id,
        data: employee
      }).then(function(response) {
        defer.resolve(response);
      }, function (error) {
        console.log("error: ", error);
      });

      return defer.promise;
    };

    this.deleteEmployee = function (employee) {
      var defer = $q.defer();

      $http({
        method: "DELETE",
        url: "api/employee/" + employee._id
      }).then(function(response) {
        defer.resolve(response);
      }, function (error) {
        console.log("error: ", error);
      });

      return defer.promise;
    };

  ////////////////////////
  // Department Calls
  ////////////////////////
    this.postDepartment = function(newDepartment) {
      var defer = $q.defer();

      $http({
        method: "POST",
        url: "api/department/569533191bfb3ca903f17803",
        data: newDepartment
      }).then(function(response) {
        defer.resolve(response);
      }, function (error) {
        console.log("error: ", error);
      });

      return defer.promise;
    };

    this.putDepartment = function(department) {
      var defer = $q.defer();

      $http({
        method: "PUT",
        url: "api/department/" + department._id,
        data: department
      }).then(function(response) {
        defer.resolve(response);
      }, function (error) {
        console.log("error: ", error);
      });
      return defer.promise;
    };

    this.deleteDepartment = function(department) {
      var defer = $q.defer();
      $http({
        method: "DELETE",
        url: "api/department/" + department._id
      }).then(function(response) {
        defer.resolve(response);
      }, function (error) {
        console.log("error: ", error)
      });
      return defer.promise;
    }

  ////////////////////////
  // Position Calls
  ////////////////////////
    this.postPosition = function(newPosition) {
      var defer = $q.defer();

      $http({
        method: "POST",
        url: "api/position/569533191bfb3ca903f17803/" + newPosition.department,
        data: newPosition
      }).then(function(response) {
        defer.resolve(response);
      }, function (error) {
        console.log("error: ", error);
      });

      return defer.promise;
    };

    this.editPosition = function(position) {
      var defer = $q.defer();
      $http({
        method: "PUT",
        url: "api/position/" + position._id,
        data: position
      }).then(function(response) {
        defer.resolve(response);
      }, function (error) {
        console.log("error: ", error);
      });
      return defer.promise;
    };

    this.deletePosition = function(position) {
      var defer = $q.defer();
      $http({
        method: "DELETE",
        url: 'api/position/' + position._id
      }).then(function(response) {
        defer.resolve(response);
      }, function (error) {
        console.log("error: ", error);
      });
      return defer.promise;
    }
});
