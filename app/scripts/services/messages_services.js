'use strict';

var messagesServices = angular.module('messagesServices', ['ngResource']);

messagesServices.factory('Message', ['$resource',
	function($resource) {
		return $resource('http://localhost:12900/search/universal/relative?query=*&range=5&streams::streamId', {streamId: '@streamId'}, {
			query: { method: 'GET' }
		});
	}
]);