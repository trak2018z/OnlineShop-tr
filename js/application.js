'use strict';

var app = angular.module( 'app' , [] );

app.controller( 'products' , [ '$scope' , '$http' , function( $scope , $http ){
	

	$http.get( 'model/produkty.json' ).
	success( function( data ){
		$scope.products = data;
	}).error( function(){
		console.log( 'Błąd pobrania pliku json' );
	});



	// console.log(  );

}]);
