var app = angular.module('terminatorApp', ['ui.router', 'ngMaterial', 'ui.bootstrap', 'ngAnimate']);


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
        .state('home', {
            url: '/home',
            templateUrl: 'Templates/home.html',
            controller: 'HomeCtrl',
        })
        .state('search', {
            url: '/search',
            templateUrl: 'Templates/search.html',
            controller: 'SearchCtrl',
        })
        .state('dashboard', {
            url: '/dashboard',
            templateUrl: 'Templates/dashboard.html',
            controller: 'DashboardCtrl',
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
            url: '/templates',
            templateUrl: 'Templates/projectTemplate.html',
            controller: 'TemplatesCtrl',
        })
        .state('yourteam', {
            url: '/yourteam',
            templateUrl: 'Templates/yourTeam.html',
            controller: 'YourTeamCtrl',
        });

    $urlRouterProvider
        .otherwise('/home');

});
