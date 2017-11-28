'use strict';

var controllersAdmin = angular.module( 'controllersAdmin' , [ 'angularFileUpload' , 'myDirectives' ] );


controllersAdmin.controller( 'products' , [ '$scope' , '$http' , 'checkToken' , function( $scope , $http , checkToken )
{
	$http.post( 'Api/admin/Products/get' , {
		token: checkToken.raw()
	}).success( function( data ){
		$scope.products = data;
	}).error( function(){
		console.log( 'Błąd komunikacji z API' );
	});

	$scope.delete = function ( product , $index ) {

		if ( !confirm( 'Czy na pewno chcesz usunąć ten produkt?' ) )
			return false;

		$scope.products.splice( $index , 1 );

		$http.post( 'Api/admin/Products/delete/' , {
			token: checkToken.raw(),
			product : product
		}).error( function(){
			console.log( 'Błąd komunikacji z API' );
		});

	};

}]);


controllersAdmin.controller( 'productEdit' , [ '$scope' , '$http' , '$routeParams' , 'FileUploader' , '$timeout' , 'checkToken' , function( $scope , $http , $routeParams , FileUploader , $timeout , checkToken )
{
	var productId = $routeParams.id;
	$scope.id = productId;

	$http.post( 'Api/Admin/Products/get/' + productId , {
		token: checkToken.raw()
	}).success( function( data ){
		$scope.product = data;
	}).error( function(){
		console.log( 'Błąd komunikacji z API' );
	});

	$scope.saveChanges = function ( product ) {

		$http.post( 'Api/Admin/Products/update/' , {
			token: checkToken.raw(),
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

	function getImages() {
		$http.post( 'Api/Admin/Images/get/' + productId , {
			token: checkToken.raw()
		}).success( function( data ){
			$scope.images = data; 
		}).error( function(){
			console.log( 'Błąd komunikacji z API' );
		});
	}
	getImages();

    var uploader = $scope.uploader = new FileUploader({
        url: 'Api/Admin/Images/upload/' + productId // ścieżka do Api obsługującego upload

    });

    uploader.filters.push({
        name: 'imageFilter',
        fn: function(item /*{File|FileLikeObject}*/, options) {
            var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
            return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
        }
    });

    uploader.onCompleteItem = function(fileItem, response, status, headers) {
        getImages();
    };

    $scope.delImage = function ( imageName , $index ) {

    	$scope.images.splice( $index , 1 );

		$http.post( 'Api/Admin/Images/delete/' , {

			token: checkToken.raw(),
			id : productId,
			image : imageName

		}).error( function(){
			console.log( 'Błąd komunikacji z API' );
		});

    };

    $scope.setThumb = function ( product , image ) {

		$http.post( 'api/admin/images/setThumb/' , {

			token: checkToken.raw(),
			product : product,
			image : image

		}).error( function(){
			console.log( 'Błąd komunikacji z API' );
		});

    };


}]);


controllersAdmin.controller( 'productCreate' , [ '$scope' , '$http' , '$timeout' , 'checkToken' , function( $scope , $http , $timeout , checkToken ){

	$scope.createProduct = function ( product ) {

		$http.post( 'Api/Admin/Products/create/' , {
			token: checkToken.raw(),
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


controllersAdmin.controller( 'users' , [ '$scope' , '$http' , 'checkToken' , function( $scope , $http , checkToken ){

	$http.post( 'Api/Admin/Users/get' , {
		token: checkToken.raw()
	}).success( function( data ){
		$scope.users = data;
	}).error( function(){
		console.log( 'Błąd komunikacji z API' );
	});

	$scope.delete = function ( user , $index ) {

		if ( !confirm( 'Czy na pewno chcesz usunąć tego użytkownika?' ) )
			return false;

		$scope.users.splice( $index , 1 );

		$http.post( 'Api/Admin/Users/delete/' , {
			token: checkToken.raw(),
			user : user
		}).error( function(){
			console.log( 'Błąd komunikacji z API' );
		});

	};


}]);


controllersAdmin.controller( 'userEdit' , [ '$scope' , '$http' , '$routeParams' , '$timeout' , 'checkToken' , function( $scope , $http , $routeParams , $timeout , checkToken ){

	var userId = $routeParams.id;
	$scope.id = userId;

	$http.post( 'Api/Admin/users/get/' + userId , {
		token: checkToken.raw()
	}).success( function( data ){
		$scope.user = data;
		console.log( data );
	}).error( function(){
		console.log( 'Błąd komunikacji z API' );
	});

	$scope.saveChanges = function ( user ) {

		$http.post( 'Api/Admin/Users/update/' , {
			token: checkToken.raw(),
			user : user,
			id : userId,
			name : user.name,
			email : user.email,
			password : user.password,
			passconf : user.passconf
		}).success( function( errors ){

			$scope.submit = true;
			
			if ( errors )
			{
				$scope.errors = errors;
			}
			else
			{
				$scope.errors = {};
				$scope.success = true;
				$timeout(function(){
					$scope.success = false;
					$scope.product = {};
				} , 3000 );
			}

		}).error( function(){
			console.log( 'Błąd komunikacji z API' );
		});

	};


}]);


controllersAdmin.controller( 'userCreate' , [ '$scope' , '$http' , '$timeout' , 'checkToken' , function( $scope , $http , $timeout , checkToken ){

	$scope.user = {};
	$scope.user.role = 'user';

	$scope.createUser = function ( user ) {

		$http.post( 'Api/Admin/Users/create/' , {
			token: checkToken.raw(),
			user : user,
			name : user.name,
			email : user.email,
			password : user.password,
			passconf : user.passconf
		}).success( function( errors ){

			$scope.submit = true;
			
			if ( errors )
			{
				$scope.errors = errors;
			}
			else
			{
				$scope.errors = {};
				$scope.success = true;
				$timeout(function(){
					$scope.success = false;
					$scope.product = {};
				} , 3000 );
			}
			
		}).error( function(){
			console.log( 'Błąd komunikacji z API' );
		});

	};

}]);


controllersAdmin.controller( 'orders' , [ '$scope' , '$http' , 'checkToken' , function( $scope , $http , checkToken )
{
	$http.post( 'Api/Admin/Orders/get/' , {

		token: checkToken.raw(),

	}).success( function( data ){

		$scope.orders = data;

		console.log( data );

		angular.forEach( $scope.orders , function( order , key ){
			var parsed = JSON.parse( order.items );
			$scope.orders[key].items = parsed;
		});

	}).error( function(){
		console.log( 'Błąd komunikacji z API' );
	});

	$scope.delete = function ( order , $index ) {

		if ( !confirm( 'Czy na pewno chcesz usunąć to zdjęcie' ) )
			return false;

		$scope.orders.splice( $index , 1 );

		$http.post( 'Api/Admin/Orders/delete/' , {
			token: checkToken.raw(),
			id: order.id
		}).error( function(){
			console.log( 'Błąd komunikacji z API' );
		});

	};

	$scope.changeStatus = function ( order ) {

		if ( order.status == 0 )
			order.status = 1;
		else
			order.status = 0;

		$http.post( 'Api/Admin/Orders/update/' , {
			token: checkToken.raw(),
			id: order.id,
			status : order.status
		}).error( function(){
			console.log( 'Błąd komunikacji z API' );
		});

	};

}]);