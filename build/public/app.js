'use strict';

var app = angular.module('terminatorApp', ['ui.router', 'ngMaterial', 'ui.bootstrap', 'ngAnimate', 'highcharts-ng']);

app.constant('companyInfo', {
  id: '569533191bfb3ca903f17803'
});

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

  $stateProvider.state('dashboard', {
    url: '/dashboard',
    templateUrl: 'templates/main.html',
    controller: 'DashboardCtrl'
  }).state('dashboard.home', {
    url: '/home',
    controller: 'DashboardCtrl',
    templateUrl: 'templates/home.html'
  }).state('dashboard.view-projects', {
    url: '/projects/view',
    controller: 'ProjectsCtrl',
    templateUrl: 'templates/projects.html'
  }).state('dashboard.activity', {
    url: '/activity',
    controller: 'ActivityCtrl',
    templateUrl: 'templates/activity.html'
  }).state('dashboard.view-employees', {
    url: '/employees/view',
    controller: 'YourTeamCtrl',
    templateUrl: 'templates/yourTeam.html'
  }).state('dashboard.company-details', {
    url: '/company',
    controller: 'YourTeamCtrl',
    templateUrl: 'templates/companyDetails.html'
  })

  // .state('singleProject', {
  //     url: '/singleProject',
  //     templateUrl: 'templates/singleProject.html',
  //     controller: 'DashboardCtrl',
  // })
  // .state('templates', {
  //     url: '/template',
  //     templateUrl: 'templates/projectTemplate.html',
  //     controller: 'TemplatesCtrl',
  // })
  // .state('templateTasks', {
  //   url:'/templateTasks/:id',
  //   // url:'/template/Tasks/:id',
  //   templateUrl: 'templates/templateTasks.html',
  //   controller: 'TemplatesCtrl'
  //   // templateUrl: 'Templates/templateTasks.html',
  //   // controller: 'TemplatesCtrl'
  // })
  // .state('yourteam', {
  //     url: '/yourteam',
  //     templateUrl: 'templates/yourTeam.html',
  //     controller: 'YourTeamCtrl',
  // })

  .state('dashboard.newSingleProject', {
    url: '/project/new/single',
    templateUrl: 'templates/newSingleProject.html',
    controller: 'NewSingleProjectCtrl'
  }).state('dashboard.newRecurringProject', {
    url: '/project/new/recurring',
    templateUrl: 'templates/newRecurringProject.html',
    controller: 'NewRecurringProjectCtrl'
  }).state('dashboard.newTriggeredProject', {
    url: '/project/new/triggered',
    templateUrl: 'templates/newTriggeredProject.html',
    controller: 'NewTriggeredProjectCtrl'
  }).state('dashboard.projectView', {
    url: '/project/:id',
    templateUrl: 'templates/oneProject.html',
    controller: 'OneProjectCtrl',
    resolve: {
      resolveProject: function resolveProject($stateParams, ProjectsSvc) {
        return ProjectsSvc.getOneProject($stateParams.id);
      },
      resolveCompany: function resolveCompany(CompanySvc) {
        return CompanySvc.getOneCompany("569533191bfb3ca903f17803");
      }
    }
  }).state('dashboard.templateView', {
    url: '/template/:id',
    templateUrl: 'templates/oneTemplate.html',
    controller: 'OneTemplateCtrl',
    resolve: {
      resolveTemplate: function resolveTemplate($stateParams, TemplatesSvc) {
        console.log('State Params', $stateParams);
        return TemplatesSvc.getOneTemplate($stateParams.id);
      },
      resolveCompany: function resolveCompany(CompanySvc) {
        return CompanySvc.getOneCompany("569533191bfb3ca903f17803");
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

  $urlRouterProvider.otherwise('/dashboard/home');
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9hcHAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFJLEdBQUcsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLGVBQWUsRUFBRSxDQUFDLFdBQVcsRUFBRSxZQUFZLEVBQUUsY0FBYyxFQUFFLFdBQVcsRUFBRSxlQUFlLENBQUMsQ0FBQyxDQUFDOztBQUVySCxHQUFHLENBQUMsUUFBUSxDQUFDLGFBQWEsRUFBRTtBQUMxQixJQUFFLEVBQUUsMEJBQTBCO0NBQy9CLENBQUMsQ0FBQTs7QUFHRixHQUFHLENBQUMsTUFBTSxDQUFDLFVBQVUsY0FBYyxFQUFFLGtCQUFrQixFQUFFLGFBQWEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBb0N0RSxnQkFBYyxDQUNULEtBQUssQ0FBQyxXQUFXLEVBQUU7QUFDaEIsT0FBRyxFQUFFLFlBQVk7QUFDakIsZUFBVyxFQUFFLHFCQUFxQjtBQUNsQyxjQUFVLEVBQUUsZUFBZTtHQUM5QixDQUFDLENBQ0QsS0FBSyxDQUFDLGdCQUFnQixFQUFDO0FBQ3BCLE9BQUcsRUFBQyxPQUFPO0FBQ1gsY0FBVSxFQUFFLGVBQWU7QUFDM0IsZUFBVyxFQUFDLHFCQUFxQjtHQUNwQyxDQUFDLENBQ0QsS0FBSyxDQUFDLHlCQUF5QixFQUFDO0FBQzdCLE9BQUcsRUFBQyxnQkFBZ0I7QUFDcEIsY0FBVSxFQUFFLGNBQWM7QUFDMUIsZUFBVyxFQUFDLHlCQUF5QjtHQUN4QyxDQUFDLENBQ0QsS0FBSyxDQUFDLG9CQUFvQixFQUFDO0FBQ3hCLE9BQUcsRUFBQyxXQUFXO0FBQ2YsY0FBVSxFQUFFLGNBQWM7QUFDMUIsZUFBVyxFQUFDLHlCQUF5QjtHQUN4QyxDQUFDLENBQ0QsS0FBSyxDQUFDLDBCQUEwQixFQUFDO0FBQzlCLE9BQUcsRUFBQyxpQkFBaUI7QUFDckIsY0FBVSxFQUFFLGNBQWM7QUFDMUIsZUFBVyxFQUFDLHlCQUF5QjtHQUN4QyxDQUFDLENBQ0QsS0FBSyxDQUFDLDJCQUEyQixFQUFDO0FBQy9CLE9BQUcsRUFBQyxVQUFVO0FBQ2QsY0FBVSxFQUFFLGNBQWM7QUFDMUIsZUFBVyxFQUFDLCtCQUErQjtHQUM5Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQyxHQTBCRCxLQUFLLENBQUMsNEJBQTRCLEVBQUc7QUFDcEMsT0FBRyxFQUFFLHFCQUFxQjtBQUMxQixlQUFXLEVBQUUsaUNBQWlDO0FBQzlDLGNBQVUsRUFBRSxzQkFBc0I7R0FDbkMsQ0FBQyxDQUNELEtBQUssQ0FBQywrQkFBK0IsRUFBRTtBQUN0QyxPQUFHLEVBQUUsd0JBQXdCO0FBQzdCLGVBQVcsRUFBRSxvQ0FBb0M7QUFDakQsY0FBVSxFQUFFLHlCQUF5QjtHQUN0QyxDQUFDLENBQ0QsS0FBSyxDQUFDLCtCQUErQixFQUFFO0FBQ3RDLE9BQUcsRUFBQyx3QkFBd0I7QUFDNUIsZUFBVyxFQUFFLG9DQUFvQztBQUNqRCxjQUFVLEVBQUUseUJBQXlCO0dBQ3RDLENBQUMsQ0FDRCxLQUFLLENBQUMsdUJBQXVCLEVBQUU7QUFDOUIsT0FBRyxFQUFDLGNBQWM7QUFDbEIsZUFBVyxFQUFFLDJCQUEyQjtBQUN4QyxjQUFVLEVBQUcsZ0JBQWdCO0FBQzdCLFdBQU8sRUFBRztBQUNSLG9CQUFjLEVBQUUsd0JBQVMsWUFBWSxFQUFDLFdBQVcsRUFBQztBQUNoRCxlQUFPLFdBQVcsQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDO09BQ25EO0FBQ0Qsb0JBQWMsRUFBRSx3QkFBUyxVQUFVLEVBQUM7QUFDbEMsZUFBTyxVQUFVLENBQUMsYUFBYSxDQUFDLDBCQUEwQixDQUFDLENBQUM7T0FDN0Q7S0FDRjtHQUNGLENBQUMsQ0FDRCxLQUFLLENBQUMsd0JBQXdCLEVBQUU7QUFDL0IsT0FBRyxFQUFDLGVBQWU7QUFDbkIsZUFBVyxFQUFFLDRCQUE0QjtBQUN6QyxjQUFVLEVBQUUsaUJBQWlCO0FBQzdCLFdBQU8sRUFBRztBQUNSLHFCQUFlLEVBQUUseUJBQVMsWUFBWSxFQUFDLFlBQVksRUFBQztBQUNoRCxlQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsRUFBRSxZQUFZLENBQUMsQ0FBQztBQUM1QyxlQUFPLFlBQVksQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDO09BQ3JEO0FBQ0Qsb0JBQWMsRUFBRSx3QkFBUyxVQUFVLEVBQUM7QUFDbEMsZUFBTyxVQUFVLENBQUMsYUFBYSxDQUFDLDBCQUEwQixDQUFDLENBQUM7T0FDN0Q7S0FDRjtHQUNGLENBQUM7Ozs7Ozs7Ozs7Ozs7QUFBQyxBQWNQLG9CQUFrQixDQUNiLFNBQVMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0NBRW5DLENBQUMsQ0FBQyIsImZpbGUiOiJwdWJsaWMvYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGFwcCA9IGFuZ3VsYXIubW9kdWxlKCd0ZXJtaW5hdG9yQXBwJywgWyd1aS5yb3V0ZXInLCAnbmdNYXRlcmlhbCcsICd1aS5ib290c3RyYXAnLCAnbmdBbmltYXRlJywgJ2hpZ2hjaGFydHMtbmcnXSk7XG5cbmFwcC5jb25zdGFudCgnY29tcGFueUluZm8nLCB7XG4gIGlkOiAnNTY5NTMzMTkxYmZiM2NhOTAzZjE3ODAzJ1xufSlcblxuXG5hcHAuY29uZmlnKGZ1bmN0aW9uICgkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyLCAkaHR0cFByb3ZpZGVyKSB7XG5cbiAgLy8gdmFyIGNoZWNrTG9nZ2VkaW4gPSBmdW5jdGlvbigkcSwgJGh0dHAsICRsb2NhdGlvbil7XG4gIC8vICAgLy8gSW5pdGlhbGl6ZSBhIG5ldyBwcm9taXNlXG4gIC8vICAgdmFyIGRlZmVycmVkID0gJHEuZGVmZXIoKTtcbiAgLy8gICAvLyBNYWtlIGFuIEFKQVggY2FsbCB0byBjaGVjayBpZiB0aGUgdXNlciBpcyBsb2dnZWQgaW5cbiAgLy9cbiAgLy8gICAkaHR0cC5nZXQoJy9jaGVja2xvZ2dlZCcpLnN1Y2Nlc3MoZnVuY3Rpb24odXNlcil7XG4gIC8vICAgICAvLyBBdXRoZW50aWNhdGVkXG4gIC8vICAgICBpZiAodXNlciAhPT0gJzAnKSBkZWZlcnJlZC5yZXNvbHZlKCk7XG4gIC8vICAgICAvLyBOb3QgQXV0aGVudGljYXRlZFxuICAvLyAgICAgZWxzZSB7XG4gIC8vICAgICAgIGRlZmVycmVkLnJlamVjdCgpO1xuICAvLyAgICAgICAkbG9jYXRpb24udXJsKCcvIy9sb2dpbicpO1xuICAvLyAgICAgfVxuICAvLyAgIH0pO1xuICAvL1xuICAvLyAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xuICAvLyB9O1xuICAvL1xuICAvLyAkaHR0cFByb3ZpZGVyLmludGVyY2VwdG9ycy5wdXNoKGZ1bmN0aW9uKCRxLCAkbG9jYXRpb24pIHtcbiAgLy8gICByZXR1cm4ge1xuICAvLyAgICAgcmVzcG9uc2U6IGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gIC8vICAgICAgIC8vIGRvIHNvbWV0aGluZyBvbiBzdWNjZXNzXG4gIC8vICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgLy8gICAgIH0sXG4gIC8vXG4gIC8vICAgICByZXNwb25zZUVycm9yOiBmdW5jdGlvbihyZXNwb25zZSkge1xuICAvLyAgICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID09PSA0MDEpe1xuICAvLyAgICAgICAgICRsb2NhdGlvbi51cmwoJy8jL2xvZ2luJyk7XG4gIC8vICAgICAgIH1cbiAgLy8gICAgICAgcmV0dXJuICRxLnJlamVjdChyZXNwb25zZSk7XG4gIC8vICAgICB9XG4gIC8vICAgfTtcbiAgLy8gfSk7XG5cbiAgJHN0YXRlUHJvdmlkZXJcbiAgICAgIC5zdGF0ZSgnZGFzaGJvYXJkJywge1xuICAgICAgICAgIHVybDogJy9kYXNoYm9hcmQnLFxuICAgICAgICAgIHRlbXBsYXRlVXJsOiAndGVtcGxhdGVzL21haW4uaHRtbCcsXG4gICAgICAgICAgY29udHJvbGxlcjogJ0Rhc2hib2FyZEN0cmwnLFxuICAgICAgfSlcbiAgICAgIC5zdGF0ZSgnZGFzaGJvYXJkLmhvbWUnLHtcbiAgICAgICAgICB1cmw6Jy9ob21lJyxcbiAgICAgICAgICBjb250cm9sbGVyOiAnRGFzaGJvYXJkQ3RybCcsXG4gICAgICAgICAgdGVtcGxhdGVVcmw6J3RlbXBsYXRlcy9ob21lLmh0bWwnLFxuICAgICAgfSlcbiAgICAgIC5zdGF0ZSgnZGFzaGJvYXJkLnZpZXctcHJvamVjdHMnLHtcbiAgICAgICAgICB1cmw6Jy9wcm9qZWN0cy92aWV3JyxcbiAgICAgICAgICBjb250cm9sbGVyOiAnUHJvamVjdHNDdHJsJyxcbiAgICAgICAgICB0ZW1wbGF0ZVVybDondGVtcGxhdGVzL3Byb2plY3RzLmh0bWwnLFxuICAgICAgfSlcbiAgICAgIC5zdGF0ZSgnZGFzaGJvYXJkLmFjdGl2aXR5Jyx7XG4gICAgICAgICAgdXJsOicvYWN0aXZpdHknLFxuICAgICAgICAgIGNvbnRyb2xsZXI6ICdBY3Rpdml0eUN0cmwnLFxuICAgICAgICAgIHRlbXBsYXRlVXJsOid0ZW1wbGF0ZXMvYWN0aXZpdHkuaHRtbCcsXG4gICAgICB9KVxuICAgICAgLnN0YXRlKCdkYXNoYm9hcmQudmlldy1lbXBsb3llZXMnLHtcbiAgICAgICAgICB1cmw6Jy9lbXBsb3llZXMvdmlldycsXG4gICAgICAgICAgY29udHJvbGxlcjogJ1lvdXJUZWFtQ3RybCcsXG4gICAgICAgICAgdGVtcGxhdGVVcmw6J3RlbXBsYXRlcy95b3VyVGVhbS5odG1sJyxcbiAgICAgIH0pXG4gICAgICAuc3RhdGUoJ2Rhc2hib2FyZC5jb21wYW55LWRldGFpbHMnLHtcbiAgICAgICAgICB1cmw6Jy9jb21wYW55JyxcbiAgICAgICAgICBjb250cm9sbGVyOiAnWW91clRlYW1DdHJsJyxcbiAgICAgICAgICB0ZW1wbGF0ZVVybDondGVtcGxhdGVzL2NvbXBhbnlEZXRhaWxzLmh0bWwnLFxuICAgICAgfSlcblxuICAgICAgLy8gLnN0YXRlKCdzaW5nbGVQcm9qZWN0Jywge1xuICAgICAgLy8gICAgIHVybDogJy9zaW5nbGVQcm9qZWN0JyxcbiAgICAgIC8vICAgICB0ZW1wbGF0ZVVybDogJ3RlbXBsYXRlcy9zaW5nbGVQcm9qZWN0Lmh0bWwnLFxuICAgICAgLy8gICAgIGNvbnRyb2xsZXI6ICdEYXNoYm9hcmRDdHJsJyxcbiAgICAgIC8vIH0pXG4gICAgICAvLyAuc3RhdGUoJ3RlbXBsYXRlcycsIHtcbiAgICAgIC8vICAgICB1cmw6ICcvdGVtcGxhdGUnLFxuICAgICAgLy8gICAgIHRlbXBsYXRlVXJsOiAndGVtcGxhdGVzL3Byb2plY3RUZW1wbGF0ZS5odG1sJyxcbiAgICAgIC8vICAgICBjb250cm9sbGVyOiAnVGVtcGxhdGVzQ3RybCcsXG4gICAgICAvLyB9KVxuICAgICAgLy8gLnN0YXRlKCd0ZW1wbGF0ZVRhc2tzJywge1xuICAgICAgLy8gICB1cmw6Jy90ZW1wbGF0ZVRhc2tzLzppZCcsXG4gICAgICAvLyAgIC8vIHVybDonL3RlbXBsYXRlL1Rhc2tzLzppZCcsXG4gICAgICAvLyAgIHRlbXBsYXRlVXJsOiAndGVtcGxhdGVzL3RlbXBsYXRlVGFza3MuaHRtbCcsXG4gICAgICAvLyAgIGNvbnRyb2xsZXI6ICdUZW1wbGF0ZXNDdHJsJ1xuICAgICAgLy8gICAvLyB0ZW1wbGF0ZVVybDogJ1RlbXBsYXRlcy90ZW1wbGF0ZVRhc2tzLmh0bWwnLFxuICAgICAgLy8gICAvLyBjb250cm9sbGVyOiAnVGVtcGxhdGVzQ3RybCdcbiAgICAgIC8vIH0pXG4gICAgICAvLyAuc3RhdGUoJ3lvdXJ0ZWFtJywge1xuICAgICAgLy8gICAgIHVybDogJy95b3VydGVhbScsXG4gICAgICAvLyAgICAgdGVtcGxhdGVVcmw6ICd0ZW1wbGF0ZXMveW91clRlYW0uaHRtbCcsXG4gICAgICAvLyAgICAgY29udHJvbGxlcjogJ1lvdXJUZWFtQ3RybCcsXG4gICAgICAvLyB9KVxuXG4gICAgICAuc3RhdGUoJ2Rhc2hib2FyZC5uZXdTaW5nbGVQcm9qZWN0JyAsIHtcbiAgICAgICAgdXJsOiAnL3Byb2plY3QvbmV3L3NpbmdsZScsXG4gICAgICAgIHRlbXBsYXRlVXJsOiAndGVtcGxhdGVzL25ld1NpbmdsZVByb2plY3QuaHRtbCcsXG4gICAgICAgIGNvbnRyb2xsZXI6ICdOZXdTaW5nbGVQcm9qZWN0Q3RybCdcbiAgICAgIH0pXG4gICAgICAuc3RhdGUoJ2Rhc2hib2FyZC5uZXdSZWN1cnJpbmdQcm9qZWN0Jywge1xuICAgICAgICB1cmw6ICcvcHJvamVjdC9uZXcvcmVjdXJyaW5nJyxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICd0ZW1wbGF0ZXMvbmV3UmVjdXJyaW5nUHJvamVjdC5odG1sJyxcbiAgICAgICAgY29udHJvbGxlcjogJ05ld1JlY3VycmluZ1Byb2plY3RDdHJsJ1xuICAgICAgfSlcbiAgICAgIC5zdGF0ZSgnZGFzaGJvYXJkLm5ld1RyaWdnZXJlZFByb2plY3QnLCB7XG4gICAgICAgIHVybDonL3Byb2plY3QvbmV3L3RyaWdnZXJlZCcsXG4gICAgICAgIHRlbXBsYXRlVXJsOiAndGVtcGxhdGVzL25ld1RyaWdnZXJlZFByb2plY3QuaHRtbCcsXG4gICAgICAgIGNvbnRyb2xsZXI6ICdOZXdUcmlnZ2VyZWRQcm9qZWN0Q3RybCdcbiAgICAgIH0pXG4gICAgICAuc3RhdGUoJ2Rhc2hib2FyZC5wcm9qZWN0VmlldycsIHtcbiAgICAgICAgdXJsOicvcHJvamVjdC86aWQnLFxuICAgICAgICB0ZW1wbGF0ZVVybDogJ3RlbXBsYXRlcy9vbmVQcm9qZWN0Lmh0bWwnLFxuICAgICAgICBjb250cm9sbGVyIDogJ09uZVByb2plY3RDdHJsJyxcbiAgICAgICAgcmVzb2x2ZSA6IHtcbiAgICAgICAgICByZXNvbHZlUHJvamVjdDogZnVuY3Rpb24oJHN0YXRlUGFyYW1zLFByb2plY3RzU3ZjKXtcbiAgICAgICAgICAgIHJldHVybiBQcm9qZWN0c1N2Yy5nZXRPbmVQcm9qZWN0KCRzdGF0ZVBhcmFtcy5pZCk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICByZXNvbHZlQ29tcGFueTogZnVuY3Rpb24oQ29tcGFueVN2Yyl7XG4gICAgICAgICAgICByZXR1cm4gQ29tcGFueVN2Yy5nZXRPbmVDb21wYW55KFwiNTY5NTMzMTkxYmZiM2NhOTAzZjE3ODAzXCIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIC5zdGF0ZSgnZGFzaGJvYXJkLnRlbXBsYXRlVmlldycsIHtcbiAgICAgICAgdXJsOicvdGVtcGxhdGUvOmlkJyxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICd0ZW1wbGF0ZXMvb25lVGVtcGxhdGUuaHRtbCcsXG4gICAgICAgIGNvbnRyb2xsZXI6ICdPbmVUZW1wbGF0ZUN0cmwnLFxuICAgICAgICByZXNvbHZlIDoge1xuICAgICAgICAgIHJlc29sdmVUZW1wbGF0ZTogZnVuY3Rpb24oJHN0YXRlUGFyYW1zLFRlbXBsYXRlc1N2Yyl7XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdTdGF0ZSBQYXJhbXMnLCAkc3RhdGVQYXJhbXMpO1xuICAgICAgICAgICAgcmV0dXJuIFRlbXBsYXRlc1N2Yy5nZXRPbmVUZW1wbGF0ZSgkc3RhdGVQYXJhbXMuaWQpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgcmVzb2x2ZUNvbXBhbnk6IGZ1bmN0aW9uKENvbXBhbnlTdmMpe1xuICAgICAgICAgICAgcmV0dXJuIENvbXBhbnlTdmMuZ2V0T25lQ29tcGFueShcIjU2OTUzMzE5MWJmYjNjYTkwM2YxNzgwM1wiKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG5cbiAgICAgIC8vIC5zdGF0ZSgnYXV0aGVkLmN1c3RvbWVyJywge1xuICAgICAgLy8gICB1cmw6ICcvY3VzdG9tZXJzLzppZCcsXG4gICAgICAvLyAgIHRlbXBsYXRlVXJsOiAnY29tcG9uZW50cy9jdXN0b21lci9jdXN0b21lci5odG1sJyxcbiAgICAgIC8vICAgY29udHJvbGxlcjogJ2N1c3RvbWVyQ3RybCcsXG4gICAgICAvLyAgIHJlc29sdmU6IHtcbiAgICAgIC8vICAgICByZXNvbHZlQ3VzdG9tZXI6IGZ1bmN0aW9uKCRzdGF0ZVBhcmFtcyxjdXN0b21lclNlcnZpY2Upe1xuICAgICAgLy8gICAgICAgcmV0dXJuIGN1c3RvbWVyU2VydmljZS5nZXRDdXN0b21lcigkc3RhdGVQYXJhbXMuaWQpO1xuICAgICAgLy8gICAgIH1cbiAgICAgIC8vICAgfVxuICAgICAgLy8gfSlcblxuICAkdXJsUm91dGVyUHJvdmlkZXJcbiAgICAgIC5vdGhlcndpc2UoJy9kYXNoYm9hcmQvaG9tZScpO1xuXG59KTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
