'use strict';

var myServices = angular.module( 'myServices' , [] );


myServices.factory( 'cart' , [ 'store' , function( store ) {

	var cart = [];

	cart.show = function () {
		console.log( 'zawartość koszyka' );
	};

	return cart;
	
}]);