'use strict';

var settingsProvider = angular.module('settingsProvider', ['ngResource']);

settingsProvider.provider('settings', ['$base64', function($base64) {
	this.$get = function() {
		var settings = {
			username: localStorage.username,
			password: localStorage.password,
			serverUrl: localStorage.serverUrl,
			disableRefresh: (localStorage.disableRefresh == undefined) ? true : localStorage.disableRefresh == "true",
			refreshInterval: localStorage.refreshInterval ? parseInt(localStorage.refreshInterval, 10) : 5000,
			authToken: function() {
				return 'Basic ' + $base64.encode(this.username + ':' + this.password);
			},
			set: function(newSettings) {
				if (newSettings.username) {
					localStorage.username = newSettings.username;
				}
				if (newSettings.password) {
					localStorage.password = newSettings.password;
				}
				if (newSettings.serverUrl) {
					localStorage.serverUrl = newSettings.serverUrl;
				}
				if (newSettings.disableRefresh != undefined) {
					localStorage.disableRefresh = newSettings.disableRefresh;
				}
				if (newSettings.refreshInterval) {
					localStorage.refreshInterval = newSettings.refreshInterval;
				}
			},
			areComplete: function() {
				return (this.username && this.password && this.serverUrl && this.refreshInterval);
			}
		};
		return settings;
	};
}]);
