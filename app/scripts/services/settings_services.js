'use strict';

var settingsProvider = angular.module('settingsProvider', ['ngResource']);

settingsProvider.provider('settings', ['$base64', function($base64) {
	this.$get = function() {
		var settings = {
			username: localStorage.username,
			password: localStorage.password,
			serverUrl: localStorage.serverUrl,
			authToken: function() {
				return "Basic " + $base64.encode(this.username + ':' + this.password);
			},
			set: function(newSettings) {
				localStorage.username = newSettings.username;
				localStorage.password = newSettings.password;
				localStorage.serverUrl = newSettings.serverUrl;
			}
		};
		return settings;
	}
}]);