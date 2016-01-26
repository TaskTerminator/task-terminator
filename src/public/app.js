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
          templateUrl: 'templates/main.html',
          controller: 'DashboardCtrl',
      })
      .state('dashboard.home',{
          url:'/home',
          controller: 'DashboardCtrl',
          templateUrl:'templates/home.html',
      })
      .state('dashboard.view-projects',{
          url:'/projects/view',
          controller: 'ProjectsCtrl',
          templateUrl:'templates/projects.html',
      })
      .state('dashboard.activity',{
          url:'/activity',
          controller: 'ActivityCtrl',
          templateUrl:'templates/activity.html',
      })
      .state('dashboard.view-employees',{
          url:'/employees/view',
          controller: 'YourTeamCtrl',
          templateUrl:'templates/yourTeam.html',
      })
      .state('dashboard.company-details',{
          url:'/company',
          controller: 'YourTeamCtrl',
          templateUrl:'templates/companyDetails.html',
      })
      .state('singleProject', {
          url: '/singleProject',
          templateUrl: 'templates/singleProject.html',
          controller: 'DashboardCtrl',
      })
      .state('templates', {
          url: '/template',
          templateUrl: 'templates/projectTemplate.html',
          controller: 'TemplatesCtrl',
      })
      .state('templateTasks', {
        url:'/templateTasks/:id',
        // url:'/template/Tasks/:id',
        templateUrl: 'templates/templateTasks.html',
        controller: 'TemplatesCtrl'
        // templateUrl: 'Templates/templateTasks.html',
        // controller: 'TemplatesCtrl'
      })
      .state('yourteam', {
          url: '/yourteam',
          templateUrl: 'templates/yourTeam.html',
          controller: 'YourTeamCtrl',
      })
      .state('newSingleProject' , {
        url: '/project/new/single',
        templateUrl: 'templates/newSingleProject.html',
        controller: 'NewSingleProjectCtrl'
      })
      .state('newRecurringProject', {
        url: '/project/new/recurring',
        templateUrl: 'templates/newRecurringProject.html',
        controller: 'NewRecurringProjectCtrl'
      })
      .state('newTriggeredProject', {
        url:'/project/new/triggered',
        templateUrl: 'templates/newTriggeredProject.html',
        controller: 'NewTriggeredProjectCtrl'
      })
      .state('projectView', {
        url:'/project/:id',
        templateUrl: 'templates/oneProject.html',
        controller : 'OneProjectCtrl',
        resolve : {
          resolveProject: function($stateParams,ProjectsSvc){
            return ProjectsSvc.getOneProject($stateParams.id);
          }
        }
      })
      .state('templateView', {
        url:'/template/:id',
        templateUrl: 'templates/oneTemplate.html',
        controller: 'OneTemplateCtrl',
        resolve : {
          resolveTemplate: function($stateParams,TemplatesSvc){
              console.log('State Params', $stateParams);
            return TemplatesSvc.getOneTemplate($stateParams.id);
          }
        }
      });


      // .state('authed.customer', {
      //   url: '/customers/:id',
      //   templateUrl: 'components/customer/customer.html',
      //   controller: 'customerCtrl',
      //   resolve: {
      //     resolveCustomer: function($stateParams,customerService){
      //       return customerService.getCustomer($stateParams.id);
      //     }
      //   }
      // })

  $urlRouterProvider
      .otherwise('/dashboard/home');

});
