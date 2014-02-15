'use strict';

var messagesServices = angular.module('messagesServices', ['ngResource']);

messagesServices.factory('Message', ['$resource',
	function($resource) {
		return $resource('$serverUrl/search/universal/relative?query=*&range=3600&limit=:limit&filter=streams::streamId', {}, {
			query: { method: 'GET', params: { limit: '' } }
		});
	}
]);