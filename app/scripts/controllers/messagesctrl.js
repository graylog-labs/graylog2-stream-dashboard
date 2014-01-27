'use strict';

angular.module('graylog2StreamdashApp')
  .controller('MessagesCtrl', ['$scope', '$routeParams', 'Message', function ($scope, $routeParams, Message) {
	console.log($routeParams);
	Message.get({ streamId: $routeParams.id}, function(response) {
		$scope.messages = response.messages.map(function(x) { return x.message; });
	});
}]);
