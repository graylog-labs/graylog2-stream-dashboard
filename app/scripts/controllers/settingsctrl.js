'use strict';

angular.module('graylog2StreamdashApp')
  .controller('SettingsCtrl', ['$scope', '$routeParams', 'settings', '$window', function ($scope, $routeParams, Settings, $window) {
	$scope.update = function() {
		// Remove trailing slash if there is one.
		if ($scope.settings.serverUrl.slice(-1) == "/") {
			$scope.settings.serverUrl = $scope.settings.serverUrl.substring(0, $scope.settings.serverUrl.length - 1);	
		}

		Settings.set($scope.settings);
		$window.location.href = '#/';
		$window.location.reload();
	};

	$scope.settings = Settings;
}]);
