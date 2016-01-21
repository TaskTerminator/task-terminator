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

  $scope.successAlert = {
    type: 'success',
    msg: 'Well done! You successfully read this important alert message.'
  }

  ///////////////////////////////////////////////////////////////
  // Employee Modals                                           //
  ///////////////////////////////////////////////////////////////

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
      controller: function ($scope, $uibModalInstance) {
        $scope.employee = employee;
        console.log($scope.employee);

        $scope.cancel = function () {
          $uibModalInstance.dismiss('cancel');
        };

      }
  	})
  }

  ///////////////////////////////////////////////////////////////
  // Department Modals
  ///////////////////////////////////////////////////////////////

  $scope.openAddDepartmentModal = function() {
  	var modalInstance = $uibModal.open({
  		animation: true,
  		templateUrl: "./templates/addNewDepartment.html",
      size: 'lg',
      controller: function ($scope, YourTeamSvc, $uibModalInstance) {
        $scope.addDepartment = function(newDepartment) {
          YourTeamSvc.postDepartment(newDepartment).then(function(results) {
            console.log("Department added");
          });
          $scope.cancel();
        }

        $scope.cancel = function () {
          $uibModalInstance.dismiss('cancel');
        };

  	 }
    })
  }

  $scope.openEditDepartmentModal = function(department) {
  	var modalInstance = $uibModal.open({
  		animation: true,
  		templateUrl: "./templates/editDepartment.html",
      size: 'lg',
      controller: function ($scope, YourTeamSvc, $uibModalInstance) {
        $scope.department = department;
        console.log($scope.department);

        $scope.cancel = function () {
          $uibModalInstance.dismiss('cancel');
        };

      }
  	})
  }

  ///////////////////////////////////////////////////////////////
  // Position Modals
  ///////////////////////////////////////////////////////////////

  $scope.openAddPositionModal = function() {
  	var modalInstance = $uibModal.open({
  		animation: true,
  		templateUrl: "./templates/addNewPosition.html",
      size: 'lg',
      controller: function($scope, YourTeamSvc, $uibModalInstance) {
        $scope.addPosition = function(newPosition) {
          YourTeamSvc.postPosition(newPosition).then(function(results) {
            console.log("Position added");
          })
          $scope.cancel();
        }
        $scope.getCompany = function() {
          CompanySvc.getCompanies().then(function(res) {
            console.log(res)
            $scope.companies = res.data;
          });
        }();

        $scope.cancel = function () {
          $uibModalInstance.dismiss('cancel');
        };

      }
  	})
  }

  $scope.openEditPositionModal = function(position) {
  	var modalInstance = $uibModal.open({
  		animation: true,
  		templateUrl: "./templates/editPosition.html",
      size: 'lg',
      controller: function ($scope, $uibModalInstance) {
        $scope.position = position;
        console.log($scope.position);

        $scope.getEmployees = function() {
          YourTeamSvc.getEmployees().then(function(res) {
            console.log(res)
            $scope.employees = res.data;
          });
        }();

        $scope.cancel = function () {
          $uibModalInstance.dismiss('cancel');
        };

      }
  	})
  }


  $scope.addEmployee = function(newEmployee) {
    console.log("Passed Employee info", newEmployee)
    YourTeamSvc.postEmployee(newEmployee).then(function(results) {
      console.log("Employee added");
    })
    $scope.newEmployee = {};
    $scope.cancel();
  }

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };


});
