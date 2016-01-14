angular.module('terminatorApp').controller('ProjectsCtrl', function($scope, $uibModal) {

  $scope.cssClass = 'page-projects';
  $scope.yes = !$scope.yes;

  $scope.openSingleModal = function() {
  	var modalInstance = $uibModal.open({
  		animation: true,
  		templateUrl: "./templates/projectForms.html",
      controller: 'ProjectsCtrl',
      size: 'lg'
  	})
  };

  $scope.openScheduleModal = function() {
    var modalInstance = $uibModal.open({
      animation: true,
      templateUrl: "./templates/scheduledProject.html",
      controller: 'ProjectsCtrl',
      size: 'lg'
    })
  };

  $scope.change = function() {
  	$scope.meh = !$scope.meh;
  };

  $scope.openModal2 = function() {
  	var modalInstance = $uibModal.open({
  		animation: true,
  		templateUrl: "./templates/singleProject.html",
      controller: 'ProjectsCtrl',
      size: 'lg'
  	})
  }

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };

  $scope.addTask = function() {
    $scope.showTaskBox = !$scope.showTaskBox;
  };

  $scope.cancelAddTask = function() {
    $scope.showTaskBox = !$scope.showTaskBox;
  };

  $scope.postProject = function() {
    var modalInstance = $uibModal.dismiss('cancel');
  }

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
