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
//////////////////////////////////////////////////////////


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

  $scope.open1 = function(event) {
    console.log(event);
    $scope.popup1.opened = true;
  };

  $scope.open2 = function() {
    $scope.popup2.opened = true;
  };

  $scope.open3 = function() {
    $scope.popup3.opened = true;
  };

  $scope.setDate = function(year, month, day) {
    $scope.dt = new Date(year, month, day);
  };

  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1
  };

  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[0];
  $scope.altInputFormats = ['M!/d!/yyyy'];

  $scope.popup1 = {
    opened: false
  };

  $scope.popup2 = {
    opened: false
  };

  $scope.popup3 = {
    opened: false
  };

  var tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  var afterTomorrow = new Date();
  afterTomorrow.setDate(tomorrow.getDate() + 1);
  $scope.events =
    [
      {
        date: tomorrow,
        status: 'full'
      },
      {
        date: afterTomorrow,
        status: 'partially'
      }
    ];

  $scope.getDayClass = function(date, mode) {
    if (mode === 'day') {
      var dayToCheck = new Date(date).setHours(0,0,0,0);

      for (var i = 0; i < $scope.events.length; i++) {
        var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

        if (dayToCheck === currentDay) {
          return $scope.events[i].status;
        }
      }
    }

    return '';
  };
});
