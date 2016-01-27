angular.module('terminatorApp').factory('CompanySvc', function($http, $q) {

  ////////////////////////
  // Company Calls
  ////////////////////////
  var service = {}

  service.getCompanies = function () {

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

<<<<<<< HEAD
  service.getOneCompany = function (id) {

=======
  this.getOneCompany = function (id) {
>>>>>>> master
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

  service.getCompanyTask = function (id) {

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

  service.postCompany = function () {
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

  service.editCompany = function () {
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

  service.deleteCompany = function (id) {
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

  return service

});
