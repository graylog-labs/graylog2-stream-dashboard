'use strict';

angular.module('graylog2StreamdashApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'streamsServices'
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
      .otherwise({
        redirectTo: '/'
      });
  });
