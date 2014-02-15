'use strict';

angular.module('graylog2StreamdashApp')
  .controller('MessagesCtrl', ['$scope', '$routeParams', 'Message', 'Stream', 'StreamAlert', 'StreamThroughput', function ($scope, $routeParams, Message, Stream, StreamAlert, StreamThroughput) {
	$scope.update = function() {
		Stream.get({id: $routeParams.id}, function(response) {
			$scope.stream = response;
		});
		
		Message.get({ streamId: $routeParams.id, limit: 100}, function(response) {
			$scope.messages = response.messages.map(function(x) {
				var msg = x.message;
				msg.timestamp = moment(new Date(msg.timestamp)).format("YYYY-MM-DD HH:mm:ss.SSS");
				return msg;
			});

			var fields = response.fields;

			// Remove some fields that we handle specifically.
			$.each(["timestamp", "message", "source"], function(i, field) {
				fields.splice(fields.indexOf(field), 1);	
			});

			$scope.fields = fields.sort();
		});

		StreamAlert.query({id: $routeParams.id}, function(response) {
			$scope.streamAlerts = [];

			$.each(response.results, function(i, alert) {
				if (alert.triggered) {
					$scope.streamAlerts.push(alert.alert_description);
				}
			});

			$scope.totalStreamAlerts = response.total_triggered;
		});

		StreamThroughput.query({id: $routeParams.id}, function(response) {
			$scope.streamThroughput = response.throughput;
		});
	};

	if (!$scope.updaterThread) {
		$scope.updaterThread = setInterval(function() {
			// $scope.scroll means scrolling *in progress* and is for smoother scrolling in some browsers.
			if (($scope.focus != undefined && !$scope.focus) || $scope.scroll || $routeParams.id === undefined) {
				return;
			}

			$scope.update();
		}, 5000);
	}
	
	$scope.limit = 40;

	$scope.increaseLimit = function() {
		$scope.limit += 3;
	};

	$scope.update();
}]);
