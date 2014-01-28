'use strict';

angular.module('graylog2StreamdashApp')
  .controller('SettingsCtrl', ['$scope', '$routeParams', 'settings', '$window', function ($scope, $routeParams, Settings, $window) {
	$scope.update = function() {
		console.log(Settings);
		Settings.set($scope.settings);
		$window.location.href = '#/';
		$window.location.reload();
	},
	$scope.settings = Settings;
}]);
