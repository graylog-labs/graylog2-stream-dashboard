'use strict';

angular.module('graylog2StreamdashApp')
  .controller('MessagesCtrl', ['$scope', '$routeParams', 'Message', 'Stream', 'StreamAlert', function ($scope, $routeParams, Message, Stream, StreamAlert) {
  	$scope.update = function() {
		Stream.get({id: $routeParams.id}, function(response) {
			$scope.stream = response;
		});
		
		Message.get({ streamId: $routeParams.id}, function(response) {
			$scope.messages = response.messages.map(function(x) { return x.message; });
			var fields = response.fields;
			fields.shift('message');
			$scope.fields = fields.sort();
		});
		StreamAlert.query({id: $routeParams.id}, function(response) {
			$scope.streamAlerts = response.alerts;
			$scope.totalStreamAlerts = response.total;
		});
  	};

	if (!$scope.updaterThread) {
		$scope.updaterThread = setInterval(function() {
			if ($routeParams.id == undefined)
				return;
			$scope.update();
		}, 2000);
	}

	$scope.update();
}]);
