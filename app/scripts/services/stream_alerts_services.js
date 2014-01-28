'use strict';

var streamAlertsServices = angular.module('streamAlertsServices', ['ngResource']);

streamAlertsServices.factory('StreamAlert', ['$resource',
	function($resource) {
		return $resource('$serverUrl/streams/:id/alerts', {id: '@id'}, {
			query: { method: 'GET', params: {id: ''} }
		});
	}
]);