angular.module('terminatorApp').controller('DashboardCtrl', function($scope, CompanySvc, ProjectsSvc) {

  $scope.cssClass = 'page-dashboard';

  $scope.getCompanies = function() {
    CompanySvc.getCompanies().then(function(res) {
      console.log(res)
      $scope.companies = res.data;
    });
  }();

  $scope.getProjects = function() {
    ProjectsSvc.getProjects().then(function(res) {
      console.log(res)
      $scope.projects = res.data;
    });
  }();

  //////////////////////
  // Datepicker Stuff
  //////////////////////

  $scope.today = function() {
    $scope.dt = new Date();
  };
  $scope.today();

  $scope.clear = function() {
    $scope.dt = null;
  };

  // Disable weekend selection
  $scope.disabled = function(date, mode) {
    return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
  };

  $scope.toggleMin = function() {
    $scope.minDate = $scope.minDate ? null : new Date();
  };

  $scope.toggleMin();
  $scope.maxDate = new Date(2020, 5, 22);

  $scope.open1 = function() {
    $scope.popup1.opened = true;
  };

  $scope.open2 = function() {
    $scope.popup2.opened = true;
  };

  $scope.open3 = function() {
    $scope.popup3.opened = true;
  };

  // $scope.setDate = function(year, month, day) {
  //   $scope.dt = new Date(year, month, day);
  // };

  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1
  };

  $scope.formats = ['MM-dd-yyyy', 'shortDate'];
  $scope.format = $scope.formats[1];

  $scope.popup1 = {
    opened: false
  };


});
