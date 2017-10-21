'use strict';

var controllersSite = angular.module( 'controllersSite' , [] );


controllersSite.controller( 'siteProducts' , [ '$scope' , '$http' , 'cartSrv' , function( $scope , $http , cartSrv ){
	
	$http.get( 'model/products.json' ).
	success( function( data ){
		$scope.products = data;
	}).error( function(){
		console.log( 'Błąd pobrania pliku json' );
	});

	$scope.addToCart = function ( product ) {
		cartSrv.add( product );
	};

}]);


controllersSite.controller( 'siteProduct' , [ '$scope' , '$http' , '$routeParams' , 'cartSrv' , function( $scope , $http , $routeParams , cartSrv ){

	$http.post( 'model/products.json' ).
	success( function( data ){
		var products = data;
		$scope.product = products[$routeParams.id];
	}).error( function(){
		console.log( 'Błąd pobrania pliku json' );
	});

	$scope.addToCart = function ( product ) {
		cartSrv.add( product );
	};

}]);


controllersSite.controller( 'siteOrders' , [ '$scope' , '$http' , function( $scope , $http ){

	$http.get( 'model/orders.json' ).
	success( function( data ){
		$scope.orders = data;
	}).error( function(){
		console.log( 'Błąd pobrania pliku json' );
	});

}]);


controllersSite.controller( 'cartCtrl' , [ '$scope' , '$http' , '$filter' , 'cartSrv' , function( $scope , $http , $filter , cartSrv ){

	$scope.cart = cartSrv.show();

	$scope.emptyCart = function () {
		cartSrv.empty();
	};

	$scope.total = function () {
		var total = 0;
		angular.forEach( $scope.cart , function ( item ) {
			total += item.qty * item.price;
		});
		total = $filter( 'number' )( total , 2 );
		return total;
	};

	$scope.removeItem = function ( $index ) {
		$scope.cart.splice( $index , 1 );
		cartSrv.update( $scope.cart );
	};

	$scope.setOrder = function ( $event ) {

		// TODO: sprawdź czy użytkownik jest zalogowany
		
		var loggedIn = true;
		if ( !loggedIn )
		{
			$scope.alert = { type : 'warning' , msg : 'Musisz być zalogowany, żeby złożyć zamówienie.' };
			$event.preventDefault();
			return false;
		}

		// TODO: zapisz zamówienie w bazie

		console.log( $scope.total() );
		console.log( $scope.cart );

		$scope.alert = { type : 'success' , msg : 'Zamówienie złożone. Nie odświeżaj strony. Trwa przekierowywanie do płatności...' };
		cartSrv.empty();

		$event.preventDefault();
		$( '#paypalForm' ).submit();
	};

	$scope.$watch( function (){
		cartSrv.update( $scope.cart );
	});

}]);


controllersAdmin.controller( 'orders' , [ '$scope' , '$http' , function( $scope , $http ){

	$http.get( 'model/orders.json' ).
	success( function( data ){
		$scope.orders = data;
	}).error( function(){
		console.log( 'Błąd pobrania pliku json' );
	});

}]);


controllersAdmin.controller( 'login' , [ '$scope' , '$http' , function( $scope , $http ){

	// TODO: pobrać dane z formularza i przesłać do bazy (uwierzytelnianie)

	$scope.input = {};

	$scope.formSubmit = function () {
		$scope.errors = {};
		$scope.errors.login = 'Błędne hasło lub email';
		console.log( $scope.input );
	};

}]);


controllersAdmin.controller( 'register' , [ '$scope' , '$http' , function( $scope , $http ){

	// TODO: pobrać dane z formularza i przesłać do bazy (uwierzytelnianie)


	$scope.formSubmit = function () {
		$scope.errors = {};
		$scope.errors.email = 'Przykładowy błąd';
		$scope.submit = true;
		console.log( $scope.input );
	};

}]);