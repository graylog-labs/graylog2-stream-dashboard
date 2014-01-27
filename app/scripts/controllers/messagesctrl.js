'use strict';

angular.module('graylog2StreamdashApp')
  .controller('MessagesCtrl', ['$scope', '$routeParams', 'Message', 'Stream', function ($scope, $routeParams, Message, Stream) {
	console.log($routeParams);
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
	}, 2000);
}]);
