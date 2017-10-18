'use strict';

var controllers = angular.module( 'controllers' , [ 'ngRoute' ] );

	// console.log(  );

controllers.controller( 'products' , [ '$scope' , '$http' , function( $scope , $http ){
	
	$http.get( 'model/produkty.json' ).
	success( function( data ){
		$scope.products = data;
	}).error( function(){
		console.log( 'Błąd pobrania pliku json' );
	});

}]);


controllers.controller( 'product' , [ '$scope' , '$http' , '$routeParams' , function( $scope , $http , $routeParams ){

	$http.get( 'model/produkty.json' ).
	success( function( data ){
		var products = data;
		$scope.product = products[$routeParams.id];
	}).error( function(){
		console.log( 'Błąd pobrania pliku json' );
	});

}]);