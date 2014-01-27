'use strict';

var streamAlertsServices = angular.module('streamAlertsServices', ['ngResource']);

streamAlertsServices.factory('StreamAlert', ['$resource',
	function($resource) {
		return $resource('http://localhost:12900/streams/:id/alerts', {id: '@id'}, {
			query: { method: 'GET', params: {id: ''} }
		});
	}
]);