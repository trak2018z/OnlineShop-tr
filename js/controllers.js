'use strict';

var myCtrls = angular.module( 'myCtrls' , [ 'ngRoute' ] );


myCtrls.controller( 'navigation' , [ '$scope' , '$location' , function( $scope , $location ){

	$scope.isActive = function ( path ) {
		return $location.path() === path;
	};

}]);


myCtrls.controller( 'products' , [ '$scope' , '$http' , function( $scope , $http ){
	
	$http.get( 'model/products.json' ).
	success( function( data ){
		$scope.products = data;
	}).error( function(){
		console.log( 'Błąd pobrania pliku json' );
	});

	$scope.delete = function ( product , $index ) {
		$scope.products.splice( $index , 1 );

		// TODO: przesłać dane przez API

	};

}]);


myCtrls.controller( 'productEdit' , [ '$scope' , '$http' , '$routeParams' , function( $scope , $http , $routeParams ){

	$http.post( 'model/products.json' ).
	success( function( data ){
		var products = data;
		$scope.product = products[$routeParams.id];
	}).error( function(){
		console.log( 'Błąd pobrania pliku json' );
	});

	$scope.saveChanges = function ( product ) {

		// TODO: przesłać dane przez API

		console.log( product );
		console.log( $routeParams.id );
	};

}]);


myCtrls.controller( 'productCreate' , [ '$scope' , '$http' , function( $scope , $http ){

	$scope.createProduct = function () {

		// TODO: przesłać dane przez API

		console.log( $scope.product );
	};

}]);


myCtrls.controller( 'users' , [ '$scope' , '$http' , function( $scope , $http ){

	$http.get( 'model/users.json' ).
	success( function( data ){
		$scope.users = data;
	}).error( function(){
		console.log( 'Błąd pobrania pliku json' );
	});

	$scope.delete = function ( user , $index ) {
		$scope.users.splice( $index , 1 );

		// TODO: przesłać dane przez API

	};

}]);


myCtrls.controller( 'userEdit' , [ '$scope' , '$http' , '$routeParams' , function( $scope , $http , $routeParams ){

	$http.post( 'model/users.json' ).
	success( function( data ){
		var users = data;
		$scope.user = users[$routeParams.id];
	}).error( function(){
		console.log( 'Błąd pobrania pliku json' );
	});

	$scope.saveChanges = function ( user ) {

		// TODO: przesłać dane przez API

		console.log( user );
		console.log( $routeParams.id );
	};

}]);


myCtrls.controller( 'userCreate' , [ '$scope' , '$http' , function( $scope , $http ){

	$scope.createUser = function () {

		// TODO: przesłać dane przez API

		console.log( $scope.user );
	};

}]);


myCtrls.controller( 'orders' , [ '$scope' , '$http' , function( $scope , $http ){

	$http.get( 'model/orders.json' ).
	success( function( data ){
		$scope.orders = data;
	}).error( function(){
		console.log( 'Błąd pobrania pliku json' );
	});

	$scope.delete = function ( user , $index ) {
		$scope.orders.splice( $index , 1 );

		// TODO: przesłać dane przez API

	};

	$scope.changeStatus = function ( order ) {

		if ( order.status == 0 )
			order.status = 1;
		else
			order.status = 0;

		// TODO: przesłać dane przez API

	};

}]);