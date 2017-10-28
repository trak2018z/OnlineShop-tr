'use strict';

var controllersSite = angular.module( 'controllersSite' , [] );


controllersSite.controller( 'siteProducts' , [ '$scope' , '$http' , 'cartSrv' , function( $scope , $http , cartSrv )
{
	$http.get( 'Api/site/Products/get' ).
	success( function( data ){
		$scope.products = data;
	}).error( function(){
		console.log( 'Błąd połączenia z API' );
	});

	$scope.addToCart = function ( product ) {
		cartSrv.add( product );
	};

	$scope.checkCart = function ( product ) {
		if ( cartSrv.show().length )
		{
			angular.forEach( cartSrv.show() , function( item ){
				if ( item.id == product.id )
				{
					product.qty = item.qty;
				}
			});
		}
	}

}]);


controllersSite.controller( 'siteProduct' , [ '$scope' , '$http' , '$routeParams' , 'cartSrv' , function( $scope , $http , $routeParams , cartSrv ){

	var id = $routeParams.id;

	$http.post( 'Api/site/Products/get/' + id ).
	success( function( data ){
		$scope.product = data;
		$scope.checkCart( $scope.product );
	}).error( function(){
		console.log( 'Błąd połączenia z API' );
	});

	$scope.addToCart = function ( product ) {
		cartSrv.add( product );
	};

	$scope.checkCart = function ( product ) {
		if ( cartSrv.show().length )
		{
			angular.forEach( cartSrv.show() , function( item ){
				if ( item.id == product.id )
				{
					product.qty = item.qty;
				}
			});
		}
	}

	function getImages() {
		$http.get( 'Api/site/Products/getImages/' + id ).
		success( function( data ){
			$scope.images = data; 
		}).error( function(){
			console.log( 'Błąd połączenia z API' );
		});
	}
	getImages();

}]);



controllersSite.controller( 'siteOrders' , [ '$scope' , '$http' , function( $scope , $http )
{
	$http.get( 'model/orders.json' ).
	success( function( data ){
		$scope.orders = data;
	}).error( function(){
		console.log( 'Błąd komunikacji z API' );
	});

}]);


controllersSite.controller( 'cartCtrl' , [ '$scope' , '$http' , '$filter' , 'cartSrv' , function( $scope , $http , $filter , cartSrv )
{
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


controllersAdmin.controller( 'orders' , [ '$scope' , '$http' , function( $scope , $http )
{

	$http.get( 'model/orders.json' ).
	success( function( data ){
		$scope.orders = data;
	}).error( function(){
		console.log( 'Błąd komunikacji z API' );
	});

}]);


controllersAdmin.controller( 'login' , [ '$scope' , '$http' , function( $scope , $http )
{
	// TODO: pobrać dane z formularza i przesłać do bazy (uwierzytelnianie)

	$scope.input = {};

	$scope.formSubmit = function () {
		$scope.errors = {};
		$scope.errors.login = 'Błędne hasło lub email';
		console.log( $scope.input );
	};

}]);


controllersAdmin.controller( 'register' , [ '$scope' , '$http' , function( $scope , $http )
{
	// TODO: pobrać dane z formularza i przesłać do bazy (uwierzytelnianie)


	$scope.formSubmit = function () {
		$scope.errors = {};
		$scope.errors.email = 'Przykładowy błąd';
		$scope.submit = true;
		console.log( $scope.input );
	};

}]);