'use strict';

angular.module('graylog2StreamdashApp')
  .controller('SettingsCtrl', ['$scope', '$routeParams', 'Settings', function ($scope, $routeParams, Settings) {
	$scope.update = function() {
		Settings.set($scope.settings);
	},
	$scope.settings = Settings.get();
}]);
