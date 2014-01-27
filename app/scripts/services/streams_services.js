'use strict';

var streamsServices = angular.module('streamsServices', ['ngResource']);

streamsServices.factory('Stream', ['$resource',
	function($resource) {
		return $resource('http://localhost:12900/streams/:id', {id: '@id'}, {
			query: { method: 'GET', params: {id: ''} }
		});
	}
]);