angular.module('terminatorApp').controller('DashboardCtrl', function($scope, CompanySvc, ProjectsSvc, TemplatesSvc) {

  $scope.cssClass = 'page-dashboard';

  $scope.getCompanies = function() {
    CompanySvc.getCompanies().then(function(res) {
      $scope.companies = res.data;
    });
  }();

  $scope.getProjects = function() {
    ProjectsSvc.getProjects().then(function(res) {
      $scope.projects = res.data;
    });
  }();

  $scope.getTemplates = function () {
    TemplatesSvc.getTemplates().then(function(res){
      $scope.templates = res.data;
    })
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

  ///////////////////////////////////////////////////////////
  //  Highcharts Stuff
  ///////////////////////////////////////////////////////////

  $scope.projectsPerWeek = {
        options: {
          colors: ['#50B432'],
            chart: {
                type: 'area',
                enableMouseTracking: true,
                plotShadow: true
            },
            legend: {
                backgroundColor: '#FCFFC5'
            },
        },

        xAxis: {
            title: {
              text: "Months",
            },
            categories: ['Jan','Feb',"Mar","Apr","May","Jun","Jul","Aug","Sept","Oct","Nov","Dec"]
        },
        yAxis: {
            title: {
                text: 'Completed Projects'
            }
        },
        series: [{
            name: 'Actual',
            data: [5, 7, 3.5, 6, 2, 9, 4, 5, 3, 5, 1, 6]
        }],
        title: {
            text: 'Projects Completed This Week'
        },
        loading: false
    };

    $scope.projectsPerMonth = {
        options: {
            chart: {
                type: 'areaspline',
                enableMouseTracking: true
            }
        },
        xAxis: {
            title: {
              text: "Years"
            },
            categories: ['Jan','Feb',"Mar","Apr","May","Jun","Jul","Aug","Sept","Oct","Nov","Dec"]
        },
        yAxis: {
            title: {
                text: 'Dollars'
            }
        },
        series: [{
            name: 'Actual',
            data: [5, 7, 3.5, 6, 2, 9, 4, 5, 3, 5, 1, 6]
        }],
        title: {
            text: 'Projects Completed Per Month'
        },
        loading: false
    };



///////////////////////////////////////////////////////////
//  Tooltip Stuff
///////////////////////////////////////////////////////////

  $scope.overdueTaskTip = "This is the overdue tasks card. It will tell you how many overdue tasks you have currently, as well as let you click the icon above to show you which tasks those are."
  $scope.currentProjectTip = "Here is how many current tasks you have. If you want to see what those current projects are, click on the icon above."
  $scope.activityTip = "It's very important to know how your business is running from the productivity and effiency side. Click on the icon above to get a more in-depth analysis."
  $scope.companyDetailsTip = "Here, you will be able to view your departments, positions, and employees, as well add, edit and remove all of the above. Click the icon above to go to that page."
  $scope.activitySnapshotTop = "Here is a small snapshot of tasks completed this week and projects completed per month. If you want more information, click on the bottom of the Activity Card."

});
