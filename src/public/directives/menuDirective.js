angular.module('terminatorApp').directive('topMenu', function() {

  return {
    restrict: 'E',
    templateUrl: 'templates/top-menu.html',
    controller: function ($scope) {
      $scope.radioModel = 'Middle';
    }
  };

});
