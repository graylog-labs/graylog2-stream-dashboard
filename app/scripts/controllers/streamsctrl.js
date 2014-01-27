'use strict';

angular.module('graylog2StreamdashApp')
  .controller('StreamsCtrl', ['$scope', '$routeParams', 'Stream', function ($scope, $routeParams, Stream) {
	Stream.query({}, function(response) {
		$scope.streams = response.streams;
	});
}]);
