var app = angular.module('terminatorApp', ['ui.router', 'ngMaterial', 'ui.bootstrap', 'ngAnimate', 'highcharts-ng']);


app.config(function ($stateProvider, $urlRouterProvider, $httpProvider) {

  // var checkLoggedin = function($q, $http, $location){
  //   // Initialize a new promise
  //   var deferred = $q.defer();
  //   // Make an AJAX call to check if the user is logged in
  //
  //   $http.get('/checklogged').success(function(user){
  //     // Authenticated
  //     if (user !== '0') deferred.resolve();
  //     // Not Authenticated
  //     else {
  //       deferred.reject();
  //       $location.url('/#/login');
  //     }
  //   });
  //
  //   return deferred.promise;
  // };
  //
  // $httpProvider.interceptors.push(function($q, $location) {
  //   return {
  //     response: function(response) {
  //       // do something on success
  //       return response;
  //     },
  //
  //     responseError: function(response) {
  //       if (response.status === 401){
  //         $location.url('/#/login');
  //       }
  //       return $q.reject(response);
  //     }
  //   };
  // });

    $stateProvider
        .state('dashboard', {
            url: '/dashboard',
            templateUrl: 'Templates/main.html',
            // controller: 'DashboardCtrl',
        })
        .state('dashboard.home',{
            url:'/home',
            controller: 'DashboardCtrl',
            templateUrl:'Templates/home.html',
        })
        .state('dashboard.view-projects',{
            url:'/projects/view',
            controller: 'ProjectsCtrl',
            templateUrl:'Templates/projects.html',
        })
        .state('dashboard.activity',{
            url:'/activity',
            controller: 'ActivityCtrl',
            templateUrl:'Templates/activity.html',
        })
        .state('dashboard.view-employees',{
            url:'/employees/view',
            controller: 'YourTeamCtrl',
            templateUrl:'Templates/yourTeam.html',
        })
        .state('dashboard.company-details',{
            url:'/company',
            controller: 'YourTeamCtrl',
            templateUrl:'Templates/companyDetails.html',
        })



        .state('projectForms', {
            url: '/projectForms',
            templateUrl: 'Templates/projectForms.html',
            controller: 'DashboardCtrl',
        })
        .state('projects', {
            url: '/projects',
            templateUrl: 'Templates/projects.html',
            controller: 'ProjectsCtrl',
        })
        .state('singleProject', {
            url: '/singleProject',
            templateUrl: 'Templates/singleProject.html',
            controller: 'DashboardCtrl',
        })
        .state('templates', {
            url: '/template',
            templateUrl: 'Templates/projectTemplate.html',
            controller: 'TemplatesCtrl',
        })
        .state('templateTasks', {
          url:'/templateTasks/:id',
          templateUrl: 'Templates/templateTasks.html',
          controller: 'TemplatesCtrl'
          // templateUrl: 'Templates/templateTasks.html',
          // controller: 'TemplatesCtrl'
        })
        .state('yourteam', {
            url: '/yourteam',
            templateUrl: 'Templates/yourTeam.html',
            controller: 'YourTeamCtrl',
        });

    $urlRouterProvider
        .otherwise('/dashboard/home');

});
