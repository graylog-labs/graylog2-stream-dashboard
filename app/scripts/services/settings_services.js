'use strict';

var settingsProvider = angular.module('settingsProvider', ['ngResource']);

settingsProvider.provider('settings', ['$base64', function($base64) {
	this.$get = function() {
		var settings = {
			username: localStorage.username,
			password: localStorage.password,
			serverUrl: localStorage.serverUrl,
			disableRefresh: (localStorage.disableRefresh == undefined) ? true : localStorage.disableRefresh == "true",
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
			},
			areComplete: function() {
				return (this.username && this.password && this.serverUrl);
			}
		};
		return settings;
	};
}]);