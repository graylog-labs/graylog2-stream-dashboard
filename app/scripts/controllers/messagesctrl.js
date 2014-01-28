'use strict';

angular.module('graylog2StreamdashApp')
  .controller('MessagesCtrl', ['$scope', '$routeParams', 'Message', 'Stream', 'StreamAlert', function ($scope, $routeParams, Message, Stream, StreamAlert) {
	Stream.get({id: $routeParams.id}, function(response) {
		$scope.stream = response;
	});
	
	Message.get({ streamId: $routeParams.id}, function(response) {
		$scope.messages = response.messages.map(function(x) { return x.message; });
	});

	if (!$scope.updaterThread) {
		$scope.updaterThread = setInterval(function() {
			console.log("updating data: " + $routeParams.id);
			if ($routeParams.id == undefined)
				return;
			Message.get({ streamId: $routeParams.id}, function(response) {
				$scope.messages = response.messages.map(function(x) { return x.message; });
			});
			StreamAlert.query({id: $routeParams.id}, function(response) {
				$scope.streamAlerts = response.alerts;
			});
		}, 2000);
	}

}]);
