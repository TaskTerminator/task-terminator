angular.module('terminatorApp').controller('DashboardCtrl', function($scope, CompanySvc, ProjectsSvc, TemplatesSvc) {

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

  $scope.getTemplates = function () {
    TemplatesSvc.getTemplates().then(function(res){
      console.log(res);
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
                type: 'bar',
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
                type: 'line',
                enableMouseTracking: true
            }
        },
        xAxis: {
            title: {
              text: "Years"
            },
            categories: ['2013','2014', '2015', '2016']
        },
        yAxis: {
            title: {
                text: 'Dollars'
            }
        },
        series: [{
            name: 'Actual',
            data: [84, 89, 94, 96]
        }],
        title: {
            text: 'Projects Completed Per Month'
        },
        loading: false
    };

});
