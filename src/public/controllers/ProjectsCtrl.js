angular.module('terminatorApp').controller('ProjectsCtrl', function($state, $scope, $uibModal, ProjectsSvc, $filter, CompanySvc) {

////////////////////////////////////////

  $scope.getProjects = function() {
    ProjectsSvc.getProjects().then(function(res) {
      console.log(res)
      $scope.projects = res.data;
    });
  }();

  $scope.getTemplates = function() {
    ProjectsSvc.getTemplates().then(function(res) {
      $scope.templates = res.data;
      console.log($scope.templates);

    });
  }();

////////////////////////////////////////

  $scope.sortProjectList = true;
  $scope.sortProjectList2 = true;
  $scope.sortProjectList3 = true;

////////////////////////////////////////

  $scope.cssClass = 'page-projects';
  $scope.yes = !$scope.yes;

  $scope.openSingleModal = function() {
  	var modalInstance = $uibModal.open({
  		animation: true,
  		templateUrl: "./templates/projectsModal.html",
      controller: 'ProjectsCtrl',
      size: 'lg'
  	})
  };

  $scope.openActivationModal = function(template) {
  	var modalInstance = $uibModal.open({
  		animation: true,
  		templateUrl: "./templates/activateTemplate.html",
      controller: function ($scope) {
        $scope.template = template;
        console.log($scope.template);
      },
      size: 'lg'
  	})
  }

  // $scope.openScheduleModal = function() {
  //   var modalInstance = $uibModal.open({
  //     animation: true,
  //     templateUrl: "./templates/scheduledProject.html",
  //     controller: 'ProjectsCtrl',
  //     size: 'lg'
  //   })
  // };
  //
  // $scope.openTemplateModal = function() {
  //   var modalInstance = $uibModal.open({
  //     animation: true,
  //     templateUrl: "./templates/projectTemplates.html",
  //     controller: "ProjectsCtrl",
  //     size: "lg"
  //   })
  // }

  $scope.change = function() {
  	$scope.meh = !$scope.meh;
  };

  $scope.openModal = function(project) {
  	var modalInstance = $uibModal.open({
  		animation: true,
  		templateUrl: "./templates/singleProject.html",
      controller: function ($scope) {
        $scope.project = project;
      },
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

  $scope.newSingleProject = {
    setup: {type: "Single"}
  };
  $scope.postProject = function(newSingleProject) {
    console.log("New Single Project Info: ", newSingleProject);
    ProjectsSvc.postProject(newSingleProject).then(function(results) {
      console.log("Single Project added: ", results);
    }).then(function(res) {
      $scope.alerts.push({msg: "Project ID Created", type: "success"})
    }).catch(function(res) {
      $scope.alerts.push({msg: "Failed to Create Project", type: "danger"})
    })
  };

  $scope.newTemplate = {};

  $scope.showTheRest = false;
  $scope.alerts = [];

  $scope.templateID;
  $scope.addTemplate = function (newTemplate) {
      ProjectsSvc.postTemplate(newTemplate).then(function(results) {
        console.log("New Template added", results);
        $scope.templateID = results.data._id;
        console.log($scope.templateID);
        // $state.go('templateTasks', {"id": templateID});
      }).then(function(res) {
        $scope.alerts.push({msg: "Project ID Created", type: "success"})
      }).catch(function(res) {
        $scope.alerts.push({msg: "Failed to Create Project", type: "danger"})
      })
      $scope.showTheRest = true;
  }

  $scope.closeAlert = function(index) {
    $scope.alerts.splice(index, 1);
  }


  // $scope.saveProject = function() {
  //   var modalInstance = $uibModal.open({
  //     animation: true,
  //     templateUrl: "./templates/projectTasks.html",
  //     controller: "ProjectsCtrl",
  //     size: "lg"
  //   })
  // }
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

  ////////
  //Updates to the project control from Template control
  ////////

  $scope.newTask = {
    name: '',
    description: '',
    assignment: {
      departments: '',
      positions: '',
      employees: ''
    }
  };

  $scope.newTasksArr = [];
  $scope.newTasksDisplayArray = [];

  $scope.getCompany = function() {
      CompanySvc.getCompanies().then(function(res) {
        console.log("Company object", res)
        $scope.companies = res.data;
        $scope.company = $scope.companies[0];
      });
    }();

  $scope.saveTask = function(newTask) {
    newTask.associatedTemplate = $scope.templateID;
    console.log(newTask);
    $scope.newTasksDisplayArray.push(newTask);
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
  }

  $scope.addTasks = function(newTasksArr) {
    ProjectsSvc.postTasks(newTasksArr, $scope.templateID).then(function(results) {
      console.log("Tasks added successfully", results);
      // $state.go('projects');
    })
  }

  $scope.allowedIntervalTypes = ['Daily', 'Daily Business Days', 'Weekly', 'Bi-Weekly', 'Monthly', 'Semi-Monthly', 'Quarterly', 'Annually'];
  $scope.allowedFrequencies = ["Triggered", "Scheduled"];
  $scope.allowedDays = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  $scope.allowedWeeklyIntervals = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Any'];
  $scope.allowedMonthlyIntervals = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  $scope.allowedSemiMonthlyIntervals = ["1st","2nd", "3rd", "4th", "5th","6th","7th","8th","9th","10th","11th","12th","13th","14th","15th"];
  $scope.allowedQuarterlyIntervals = ["First Day of the Quarter", "Last Day of the Quarter", "# Days from Start", "# Days from End", "Any" ];
  $scope.allowedAnnuallyIntervals = ["First Day of the Year", "Last Day of the Year", "Any Day of the year", "In a Particular Month", "In a Particular Quarter", "# of Days From Start", "# of Days Before End"];


  /////////////////
  //Adding Scheduled Project
  /////////////////

  $scope.newInterval = {};

  $scope.addIntervalProject = function (newInterval) {
      ProjectsSvc.postIntervalProject(newInterval).then(function(results) {
        console.log("New Scheduled Project added", results);
        $scope.templateID = results.data._id;
        console.log($scope.templateID);
        // $state.go('templateTasks', {"id": templateID});
      }).then(function(res) {
        $scope.alerts.push({msg: "Project ID Created", type: "success"})
      }).catch(function(res) {
        $scope.alerts.push({msg: "Failed to Create Project", type: "danger"})
      })
      $scope.showTheRest = true;
  }

  $scope.singleProject = {};

  $scope.addSingleProject = function (singleProject) {
      ProjectsSvc.postSingleProject(singleProject).then(function(results) {
        console.log("New Single Project added", results);
        $scope.templateID = results.data._id;
        console.log($scope.templateID);
        // $state.go('templateTasks', {"id": templateID});
      }).then(function(res) {
        $scope.alerts.push({msg: "Project ID Created", type: "success"})
      }).catch(function(res) {
        $scope.alerts.push({msg: "Failed to Create Project", type: "danger"})
      })
      $scope.showTheRest = true;
  }

});
