'use strict';

var settingsServices = angular.module('settingsServices', ['ngResource']);

settingsServices.service('Settings', function() {
	this.get = function() {
		var settings = {
			username: localStorage.username,
			password: localStorage.password,
			serverUrl: localStorage.serverUrl
		};
		return settings;
	},

	this.set = function(newSettings) {
		localStorage.username = newSettings.username;
		localStorage.password = newSettings.password;
		localStorage.serverUrl = newSettings.serverUrl;
	};
});