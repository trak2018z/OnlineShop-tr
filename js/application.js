'use strict';

var app = angular.module( 'app' , [ 'ngRoute' , 'myCtrls' ] );

app.config( [ '$routeProvider' , '$httpProvider' , function( $routeProvider , $httpProvider ) {


	// ================== Products ====================

	$routeProvider.when( '/products' , {
		controller : 'products',
		templateUrl : 'partials/products.html'
	});

	$routeProvider.when( '/product/edit/:id' , {
		controller: 'productEdit',
		templateUrl : 'partials/product-edit.html'
	});

	$routeProvider.when( '/product/create' , {
		controller: 'productCreate',
		templateUrl : 'partials/product-create.html'
	});

	// ================== Users ====================

	$routeProvider.when( '/users' , {
		controller: 'users',
		templateUrl : 'partials/users.html'
	});

	$routeProvider.when( '/user/edit/:id' , {
		controller: 'userEdit',
		templateUrl : 'partials/user-edit.html'
	});

	$routeProvider.when( '/user/create' , {
		controller: 'userCreate',
		templateUrl : 'partials/user-create.html'
	});

	// ================== Orders ====================

	$routeProvider.when( '/orders' , {
		controller: 'orders',
		templateUrl : 'partials/orders.html'
	});

	// ================== Default ====================

	$routeProvider.otherwise({
		redirectTo: '/home'
	});

}]);


