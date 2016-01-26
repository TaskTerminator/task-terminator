angular.module('terminatorApp').controller('OneTemplateCtrl', function($scope, resolveTemplate) {

  $scope.test = "The one template ctrl is working!";
  $scope.template = resolveTemplate;


});
