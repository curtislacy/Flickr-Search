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

  .service('x2js', function() {
    return new X2JS();
  })

  .service( 'ImageListService', function() {
    return {
      available_images: []
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
  .controller('SearchFormCtrl', function( $scope, $http, SettingsService, x2js, ImageListService ) {
    $scope.doSearch = function() {
      // Clear out the list of old results while we load new ones.
      ImageListService.available_images = [];
      ImageListService.displayed_image = null;
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
          if( response.status === 200 ) {
            var jsonResponse = x2js.xml_str2json( response.data );
            // We're ignoring all the paging of results, etc.  For now we take the
            // 100 that end up in the result array and use them as a list.
            var photoList = jsonResponse.rsp.photos.photo;
            // Since this data came from a 3rd party (flickr), we really SHOULDN'T trust it
            // blindly.  It should be sanitized, but I'm not bothering here.
            ImageListService.available_images = photoList;
          } else {
            // TODO: Post an error message - some sanitization of response.statusText.

          }
        }, 
        function( response ) {
          // TODO: Post an error message - some sanitization of response.statusText?
        });
    };
  })

  .controller('ResultsViewerCtrl', function( $scope, $http, ImageListService, SettingsService, x2js ) {
    $scope.imageListService = ImageListService;
    $scope.showImage = function( imageData ) {
      $scope.imageListService.displayed_image=imageData;

      $scope.metadata = null;
      $http({
        method: 'GET',
        url: SettingsService.endpoint,
        params: {
          method: 'flickr.photos.getInfo',
          api_key: SettingsService.api_key,
          photo_id: $scope.imageListService.displayed_image._id
        }
      })
      .then(
        function( response ) {
          // On success
          if( response.status === 200 ) {
            var jsonResponse = x2js.xml_str2json( response.data );
            // Usual caviat applies here about how we SHOULD be sanitizing this, but that code
            // is tedious and repetitive.
            $scope.metadata = jsonResponse.rsp.photo;
            console.log( jsonResponse );
          } else {
            // TODO: Post an error message - some sanitization of response.statusText.

          }
        }, 
        function( response ) {
          // TODO: Post an error message - some sanitization of response.statusText?
        });

    };
  });
