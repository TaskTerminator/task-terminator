angular.module('terminatorApp').service('CompanySvc', function($http, $q) {

  ////////////////////////
  // Company Calls
  ////////////////////////

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
  };

  this.getOneCompany = function (id) {
    var defer = $q.defer();
    $http({
      method: "GET",
      url: "/api/company/" + id
    }).then(function(response) {
      defer.resolve(response);
    }, function (error) {
      console.log("error: ", error);
    });
    return defer.promise;
  };

  this.getCompanyTask = function (id) {

    var defer = $q.defer();

    $http({
      method: "GET",
      url: "/api/tasks/company/" + id
    }).then(function(response) {
      defer.resolve(response);
    }, function (error) {
      console.log("error: ", error);
    });

    return defer.promise;
  };

  this.postCompany = function () {
    var defer = $q.defer();

    $http({
      method: "POST",
      url: "/api/company",
      data: {}
    }).then(function(response) {
      defer.resolve(response);
    }, function (error) {
      console.log("error: ", error);
    });

    return defer.promise;
  };

  this.editCompany = function () {
    var defer = $q.defer();

    $http({
      method: "PUT",
      url: "/api/company/" + id,
      data: {}
    }).then(function(response) {
      defer.resolve(response);
    }, function (error) {
      console.log("error: ", error);
    });

    return defer.promise;
  };

  this.deleteCompany = function (id) {
    var defer = $q.defer();

    $http({
      method: "DELETE",
      url: "/api/company/" + id
    }).then(function(response) {
      defer.resolve(response);
    }, function (error) {
      console.log("error: ", error);
    });

    return defer.promise;;
  };


});
