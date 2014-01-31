'use strict';

angular.module('graylog2StreamdashApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'base64',
  'angularMoment',
  'settingsProvider',
  'streamsServices',
  'streamAlertsServices',
  'streamThroughputServices',
  'messagesServices'
])
  .config(function ($httpProvider, settingsProvider) {
  var Settings = settingsProvider.$get();
	$httpProvider.defaults.withCredentials = true;
	$httpProvider.defaults.headers.common.Authorization = Settings.authToken();
  $httpProvider.interceptors.push(function($q) {
    return {
      'request': function(config) {
        config.url = config.url.replace('$serverUrl', Settings.serverUrl);
        return config || $q.when(config);
      }
    };
  });
  $httpProvider.interceptors.push(function($q, $rootScope) {
    return {
      'response': function(response) {
        $rootScope.alerts = [];
        return response;
      },
      'responseError': function(rejection) {
        var alert = {type: 'danger',
          message: 'Unable to connect to graylog2 server! Please check your connection <a href="#/settings">settings.'};

        $rootScope.alerts = [alert];
        return rejection;
      }
    };
  });
})
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/streams.html',
        controller: 'StreamsCtrl'
      })
      .when('/settings', {
        templateUrl: 'views/settings.html',
        controller: 'SettingsCtrl'
      })
      .when('/messages/:id', {
        templateUrl: 'views/messages.html',
        controller: 'MessagesCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .run(function($rootScope, $location, settings) {
    //var Settings = settingsProvider.$get();
    $rootScope.$on('$routeChangeStart', function(event, next) {
      if (settings.areComplete() || next === 'settings' ) {
        return;
      }

      $location.path('settings');
    });
  });
