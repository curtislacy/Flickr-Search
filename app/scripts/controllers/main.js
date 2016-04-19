'use strict';

/**
 * @ngdoc function
 * @name flickrSearchApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the flickrSearchApp
 */
angular.module('flickrSearchApp')

  // CML: If we make this a service, we can make these settings loaded from the server, or stored encrypted, or anything else interesting.
  .service('SettingsService', function() {
    return {
      'api_key': '22c6a6d8a2940f79a39873387b4dd05d',
      'endpoint': 'https://api.flickr.com/services/rest/'
    };
  })

  .controller('MainCtrl', function () {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  })

  // CML: If this got any larger, we'd put each controller in its own file, but we'll
  // leave it all together for now.
  .controller('SearchFormCtrl', function( $scope, $http, SettingsService ) {
    $scope.doSearch = function() {
      // Comma separate the list of words, since that's what the Flickr API expects.
      var commaSeparated = $scope.keyword ? $scope.keyword.trim().split( ' ' ).join( ',' ) : '';
      $http({
        method: 'GET',
        url: SettingsService.endpoint,
        params: {
          method: 'flickr.photos.search',
          api_key: SettingsService.api_key,
          tags: commaSeparated
        }
      })
      .then( 
        function( response ) {
          // On success
          if( response.status == 200 ) {

          } else {
            // TODO: Post an error message - some sanitization of response.statusText.
          }
          console.log( 'Success:' );
          console.log( response );
        }, 
        function( response ) {
          // TODO: Post an error message - some sanitization of response.statusText.
        });
    };
  });
