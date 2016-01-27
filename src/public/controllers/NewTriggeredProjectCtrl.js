angular.module('terminatorApp').controller('NewTriggeredProjectCtrl', function($scope, ProjectsSvc, $state) {

  	$scope.test = "The new triggered project ctrl is working!";

  	$scope.newTriggeredForm = {};
  	$scope.selectedAssign = '';

  	$scope.addTriggeredTemplate = function (newTriggeredForm) {
        if (newTriggeredForm.name===undefined) {
            alert('Please enter a project name.');
        } else {
            ProjectsSvc.postTriggeredTemplate(newTriggeredForm).then(function(results) {
              console.log("New Triggered Template added", results);
              $state.go('dashboard.templateView', {id: results._id});
            }).catch(function(err) {
              // $scope.alerts.push({msg: "Failed to Create Project", type: "danger"});
              console.log("Error", err);
            });        
        }
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
