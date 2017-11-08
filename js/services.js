'use strict';

var myServices = angular.module( 'myServices' , [] );


myServices.factory( 'cartSrv' , [ 'store' , function( store ) {

	if ( store.get( 'cart' ) )
		var cart = store.get( 'cart' );
	else
		var cart = [];

	cart.show = function () {
		return cart;
	};

	cart.add = function ( product ) {

		if ( !cart.length )
		{
			product.qty = 0;
			cart.push( product );
		}

		var addNew = true;
		angular.forEach( cart , function ( value , key ) {

			// TODO: zmienić name na id gdy będzie kontakt z bazą

			if ( value.name == product.name )
			{
				addNew = false;
				cart[key].qty++;
			}
		});

		if ( addNew )
		{
			product.qty = 1;
			cart.push( product );
		}

		store.set( 'cart' , cart.show() );

	}

	cart.empty = function () {
		store.remove( 'cart' );
		cart.length = 0;
	};

	cart.update = function ( newCart ) {
		store.set( 'cart' , newCart );
	};

	return cart;
	
}]);


myServices.service( 'checkToken' , [ 'store' , 'jwtHelper' , function( store , jwtHelper ) {

	var rawToken = store.get( 'token' );
	var token;

	if ( rawToken )
		token = jwtHelper.decodeToken( rawToken );
	else
		token = false;

	this.payload = function () {
		return token;
	};

	this.expired = function () {
		var currentDate = new Date();
		var currentTime = currentDate.getTime();
		if(currentTime > token.expireTime*1000)
			return true;
		else
			return false;
	}

	this.loggedIn = function () {
		if ( token )
		{
			if(this.expired())
				return false;
			else
				return true;
		}
		else
			return false;
	};

	this.isAdmin = function () {
		if ( token.role == 'admin' )
		{
			if(this.expired())
				return false;
			else
				return true;
		}
		else
			return false;
	};

	this.raw = function () {
		return rawToken;
	};

	this.del = function () {
		store.remove( 'token' );
	};


}]);