'use strict';

var controllersAdmin = angular.module( 'controllersAdmin' , [ 'angularFileUpload' , 'myDirectives' ] );


controllersAdmin.controller( 'products' , [ '$scope' , '$http' , function( $scope , $http ){
	
	$http.get( 'Api/admin/Products/get' ).
	success( function( data ){
		$scope.products = data;
	}).error( function(){
		console.log( 'Błąd pobrania pliku json' );
	});

	$scope.delete = function ( product , $index ) {

		if ( !confirm( 'Czy na pewno chcesz usunąć ten produkt?' ) )
			return false;

		$scope.products.splice( $index , 1 );

		$http.post( 'Api/admin/Products/delete/' , {
			product : product
		}).error( function(){
			console.log( 'Błąd komunikacji z API' );
		});

	};

}]);


controllersAdmin.controller( 'productEdit' , [ '$scope' , '$http' , '$routeParams' , 'FileUploader' , '$timeout' , function( $scope , $http , $routeParams , FileUploader, $timeout ){

	var productId = $routeParams.id;
	$scope.id = productId;

	$http.get( 'Api/admin/Products/get/' + productId ).
	success( function( data ){
		$scope.product = data;
	}).error( function(){
		console.log( 'Błąd pobrania pliku json' );
	});

	function getImages(){
		$http.get( 'Api/admin/images/get/' + productId ).
	success( function( data ){
		var products = data;
		$scope.images = data;
	}).error( function(){
		console.log( 'Błąd pobrania pliku json' );
	});
	}
	getImages();

	

	$scope.saveChanges = function ( product ) {

		$http.post( 'Api/admin/Products/update/' , {
			product : product
		}).success( function(){
			$scope.success = true;

			$timeout(function(){
				$scope.success = false;
			} , 3000 );

		}).error( function(){
			console.log( 'Błąd komunikacji z API' );
		});

	};

	$scope.delImage = function ( imageName, $index ) {
		$http.post( 'Api/admin/images/delete/', {
		 id : productId,
		 image : imageName 
		}).	success( function(  ){
			$scope.images.splice( $index , 1 );
		}).error( function(){
			console.log( 'Błąd pobrania pliku json' );
		});
	};

    var uploader = $scope.uploader = new FileUploader({
        url: 'Api/admin/images/upload/' + productId // ścieżka do api obsługującego upload
    });

    uploader.filters.push({
        name: 'imageFilter',
        fn: function(item /*{File|FileLikeObject}*/, options) {
            var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
            return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
        }
    });

    uploader.onCompleteItem = function(fileItem, response, status, headers) {
        console.info('onCompleteItem', fileItem, response, status, headers);
        getImages();
    };


}]);


controllersAdmin.controller( 'productCreate' , [ '$scope' , '$http' , '$timeout' ,  function( $scope , $http, $timeout ){

	$scope.createProduct = function ( product ) {

		$http.post( 'Api/admin/Products/create/' , {
			product : product
		}).success( function(){
			$scope.success = true;

			$timeout(function(){
				$scope.success = false;
				$scope.product = {};
			} , 3000 );

		}).error( function(){
			console.log( 'Błąd komunikacji z API' );
		});

	};

}]);


controllersAdmin.controller( 'users' , [ '$scope' , '$http' , function( $scope , $http ){

	$http.get( 'model/users.json' ).
	success( function( data ){
		$scope.users = data;
	}).error( function(){
		console.log( 'Błąd pobrania pliku json' );
	});

	$scope.delete = function ( user , $index ) {

		if ( !confirm( 'Czy na pewno chcesz usunąć tego użytkownika?' ) )
			return false;

		$scope.users.splice( $index , 1 );

		// TODO: przesłać dane przez API

	};

}]);


controllersAdmin.controller( 'userEdit' , [ '$scope' , '$http' , '$routeParams' , function( $scope , $http , $routeParams ){

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


controllersAdmin.controller( 'userCreate' , [ '$scope' , '$http' , function( $scope , $http ){

	$scope.createUser = function () {

		// TODO: przesłać dane przez API

		console.log( $scope.user );
	};

}]);


controllersAdmin.controller( 'orders' , [ '$scope' , '$http' , function( $scope , $http ){

	$http.get( 'model/orders.json' ).
	success( function( data ){
		$scope.orders = data;
	}).error( function(){
		console.log( 'Błąd pobrania pliku json' );
	});

	$scope.delete = function ( user , $index ) {

		if ( !confirm( 'Czy na pewno chcesz usunąć to zdjęcie' ) )
			return false;

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