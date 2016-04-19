'use strict';

/**
 * @ngdoc function
 * @name flickrSearchApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the flickrSearchApp
 */
angular.module('flickrSearchApp')

  .controller('MainCtrl', function () {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  })

  // CML: If this got any larger, we'd put each controller in its own file, but we'll
  // leave it all together for now.
  .controller('SearchFormCtrl', function( $scope ) {
    $scope.doSearch = function() {
      console.log( '* Search: ' + $scope.keyword );
    };
  });
