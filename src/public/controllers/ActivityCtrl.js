angular.module('terminatorApp').controller('ActivityCtrl', function($scope) {

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
          text: "Weeks",
        },
        categories: ['1/4','1/11',"1/18","1/25","2/1","2/8","2/15","2/22","2/29","3/7","3/14","3/21"]
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
        colors: ['#50B432'],
          chart: {
              type: 'line',
              enableMouseTracking: true
          }
      },
      xAxis: {
          title: {
            text: "Months",
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
          data: [20, 25, 30, 28, 21, 31, 25, 27, 30, 29, 27, 24]
      }],
      title: {
          text: 'Projects Completed Per Month'
      },
      loading: false
  };

  $scope.tasksPerWeek = {
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
              text: "Weeks",
            },
            categories: ['1/4','1/11',"1/18","1/25","2/1","2/8","2/15","2/22","2/29","3/7","3/14","3/21"]
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
            text: 'Tasks Completed Per Week'
        },
        loading: false
  };

  $scope.tasksPerMonth = {
      options: {
          chart: {
              type: 'line',
              enableMouseTracking: true
          }
      },
      xAxis: {
          title: {
            text: "Months",
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
          data: [23, 22, 30, 35, 28, 32, 37, 24, 35, 25, 26, 22]
      }],
      title: {
          text: 'Tasks Completed Per Month'
      },
      loading: false
  };

  $scope.overdueTasksPerWeek = {
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
              text: "Weeks",
            },
            categories: ['1/4','1/11',"1/18","1/25","2/1","2/8","2/15","2/22","2/29","3/7","3/14","3/21"]
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
            text: 'Overdue Tasks This Week'
        },
        loading: false
  };

  $scope.overdueTasksPerMonth = {
      options: {
          chart: {
              type: 'line',
              enableMouseTracking: true
          }
      },
      xAxis: {
          title: {
            text: "Months",
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
          data: [28, 25, 26, 32, 25, 29, 37, 32, 31, 33, 26, 30]
      }],
      title: {
          text: 'Overdue Tasks Per Month'
      },
      loading: false
  };

});
