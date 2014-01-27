'use strict';

angular.module('graylog2StreamdashApp')
  .controller('MessagesCtrl', ['$scope', '$routeParams', 'Message', 'Stream', 'StreamAlert', function ($scope, $routeParams, Message, Stream, StreamAlert) {
	Stream.get({id: $routeParams.id}, function(response) {
		$scope.stream = response;
	});
	
	Message.get({ streamId: $routeParams.id}, function(response) {
		$scope.messages = response.messages.map(function(x) { return x.message; });
	});
	
	setInterval(function() {
		Message.get({ streamId: $routeParams.id}, function(response) {
			$scope.messages = response.messages.map(function(x) { return x.message; });
		});
		StreamAlert.query({id: $routeParams.id}, function(response) {
			$scope.streamAlerts = response.alerts;
		});
	}, 2000);
}]);
