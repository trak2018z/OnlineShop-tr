'use strict';

var myCtrls = angular.module( 'myCtrls' , [ 'ngRoute' ] );

	// console.log(  );

myCtrls.controller( 'products' , [ '$scope' , '$http' , function( $scope , $http ){
	
	$http.get( 'model/produkty.json' ).
	success( function( data ){
		$scope.products = data;
	}).error( function(){
		console.log( 'Błąd pobrania pliku json' );
	});

}]);


myCtrls.controller( 'product' , [ '$scope' , '$http' , '$routeParams' , function( $scope , $http , $routeParams ){

	$http.get( 'model/produkty.json' ).
	success( function( data ){
		var products = data;
		$scope.product = products[$routeParams.id];
	}).error( function(){
		console.log( 'Błąd pobrania pliku json' );
	});

	$scope.saveChanges = function ( product ) {
		console.log( product );
		console.log( $routeParams.id );
	};

}]);