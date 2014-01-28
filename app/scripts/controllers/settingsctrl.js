'use strict';

angular.module('graylog2StreamdashApp')
  .controller('SettingsCtrl', ['$scope', '$routeParams', 'settings', function ($scope, $routeParams, Settings) {
	$scope.update = function() {
		console.log(Settings);
		Settings.set($scope.settings);
	},
	$scope.settings = Settings;
}]);
