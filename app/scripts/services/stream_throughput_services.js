'use strict';

var streamThroughputServices = angular.module('streamThroughputServices', ['ngResource']);

streamThroughputServices.factory('StreamThroughput', ['$resource',
	function($resource) {
		return $resource('$serverUrl/streams/:id/throughput', {id: '@id'}, {
			query: { method: 'GET', params: {id: ''} }
		});
	}
]);