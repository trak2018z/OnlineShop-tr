'use strict';

var aplikacja = angular.module( 'aplikacja' , [] );

aplikacja.controller( 'test' , [ '$scope' , function( $scope ){
	
	$scope.nazwa = 'jakieś dane';

}]);
