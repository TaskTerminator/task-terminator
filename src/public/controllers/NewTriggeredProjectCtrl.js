angular.module('terminatorApp').controller('NewTriggeredProjectCtrl', function($scope, ProjectsSvc) {

  	$scope.test = "The new triggered project ctrl is working!";

  	$scope.newTriggeredForm = {};
  	$scope.selectedAssign

  	$scope.addTriggeredTemplate = function (newTriggeredForm) {
	    ProjectsSvc.postTriggeredTemplate(newTriggeredForm).then(function(results) {
	      console.log("New Triggered Template added", results);
	      $scope.templateID = results.data._id;
	      console.log($scope.templateID);
	      // $state.go('templateTasks', {"id": templateID});
	    }).then(function(res) {
	      // $scope.alerts.push({msg: "Project ID Created", type: "success"});
	      console.log("Results",res);
	    }).catch(function(err) {
	      // $scope.alerts.push({msg: "Failed to Create Project", type: "danger"});
	      console.log("Error", err);
	    });
	    $scope.showTheRest = true;
	};

	$scope.newTasksArr = [];

	$scope.newTask = {
	      name: '',
	      description: '',
	      assignment: {
	        departments: '',
	        positions: '',
	        employees: ''
	      }
	    };

  	$scope.saveTask = function(newTask) {
	    newTask.associatedTemplate = $scope.templateID;
	    console.log(newTask);
	    if(newTask.assignment.departments) newTask.assignment.departments = newTask.assignment.departments._id;
	    if(newTask.assignment.positions) newTask.assignment.positions = newTask.assignment.positions._id;
	    if(newTask.assignment.employees) newTask.assignment.employee = newTask.assignment.employee._id;
	    $scope.newTasksArr.push(newTask);
	    console.log("newTasksArr", $scope.newTasksArr);
	    $scope.newTask = {
	      name: '',
	      description: '',
	      assignment: {
	        departments: '',
	        positions: '',
	        employees: ''
	      }
	    };
	    // $scope.selectedAssign = null; tryig to clear drop downs with this.
  	};

  	$scope.addTasks = function(newTasksArr) {
	    ProjectsSvc.postTasks(newTasksArr, $scope.templateID).then(function(results) {
	      console.log("Tasks added successfully", results);
	      // $state.go('projects');
	    });
	    $scope.newTasksArr = [];
  	};

});
