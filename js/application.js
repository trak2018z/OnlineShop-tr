'use strict';

var app = angular.module( 'app' , [] );

app.controller( 'products' , [ '$scope' , function( $scope ){
	
	$scope.products = [
		{ nazwa : 'pomarańcza' , waga : 0.3 , opis : 'Świeże, smaczne, prosto z Hiszpanii' },
		{ nazwa : 'jabłko' , waga : 0.2 , opis : 'Ligol prosto od polskich producentów' }
	];

	console.log(  );

}]);
