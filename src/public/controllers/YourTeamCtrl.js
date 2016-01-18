angular.module('terminatorApp').controller('YourTeamCtrl', function($scope, $uibModal, YourTeamSvc, $state, CompanySvc) {

  $scope.newEmployee = {};

  $scope.getEmployees = function() {
    YourTeamSvc.getEmployees().then(function(res) {
      console.log(res)
      $scope.employees = res.data;
    });
  }();

  $scope.getCompany = function() {
    CompanySvc.getCompanies().then(function(res) {
      console.log(res)
      $scope.companies = res.data;
    });
  }();


  $scope.cssClass = 'page-yourTeam';

  $scope.openAddEmployeeModal = function() {
  	var modalInstance = $uibModal.open({
  		animation: true,
  		templateUrl: "./templates/addNewEmployee.html",
      controller: 'YourTeamCtrl',
      size: 'lg'
  	})
  }

  $scope.openEditEmployeeModal = function(employee) {
  	var modalInstance = $uibModal.open({
  		animation: true,
  		templateUrl: "./templates/editEmployee.html",
      size: 'lg',
      controller: function ($scope) {
        $scope.employee = employee;
      }
  	})
  }

  $scope.addEmployee = function(newEmployee) {
    console.log("Passed Employee info", newEmployee)
    YourTeamSvc.postEmployee(newEmployee).then(function(results) {
      console.log("Employee added");
    })
  }

});
