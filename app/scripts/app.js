'use strict';

angular.module('graylog2StreamdashApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'streamsServices',
  'messagesServices'
])
  .config(function ($httpProvider) {
	$httpProvider.defaults.withCredentials = true;
	$httpProvider.defaults.headers.common.Authorization = 'Basic YWRtaW46Zm9vYmFy';
})
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/streams.html',
        controller: 'StreamsCtrl'
      })
      .when('/messages/:id', {
        templateUrl: 'views/messages.html',
        controller: 'MessagesCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
