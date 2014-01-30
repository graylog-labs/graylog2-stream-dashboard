'use strict';

angular.module('graylog2StreamdashApp')
  .controller('MessagesCtrl', ['$scope', '$routeParams', 'Message', 'Stream', 'StreamAlert', function ($scope, $routeParams, Message, Stream, StreamAlert) {
	Stream.get({id: $routeParams.id}, function(response) {
		$scope.stream = response;
	});
	
	Message.get({ streamId: $routeParams.id}, function(response) {
		for (var field in response.messages[0].message) {
			console.log(field);
		}
		$scope.messages = response.messages.map(function(x) { return x.message; });
		var fields = response.fields;
		fields.shift('message');
		$scope.fields = fields.sort();
	});

	if (!$scope.updaterThread) {
		$scope.updaterThread = setInterval(function() {
			if ($routeParams.id == undefined)
				return;
			Message.get({ streamId: $routeParams.id}, function(response) {
				$scope.lastUpdate = new Date();
				$scope.messages = response.messages.map(function(x) { return x.message; });
			});
			StreamAlert.query({id: $routeParams.id}, function(response) {
				$scope.streamAlerts = response.alerts;
				$scope.totalStreamAlerts = response.total;
			});
		}, 2000);
	}

}]);
