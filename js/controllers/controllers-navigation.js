'use strict';

var controllersNavigation = angular.module( 'controllersNavigation' , [] );


controllersNavigation.controller( 'navigation' , [ '$scope' , '$location' , 'cartSrv' , 'checkToken' , function( $scope , $location , cartSrv , checkToken ){

	$scope.navigation = function () {

		if ( /^\/admin/.test( $location.path() ) )
		{

			if ( !checkToken.isAdmin() )
			{	
				window.location.href = '#/products?alert=noAdmin';
			}

			if ( checkToken.expired() )
			{	
				checkToken.del();
				window.location.href = '#/products?alert=tokenExpired';
			}

			return 'partials/admin/navigation.html';

		}
		else
		{
			if ( $location.search().alert == 'noAdmin' )
				$scope.noAdmin = true;
			else
				$scope.noAdmin = false;

			if ( $location.search().alert == 'tokenExpired' )
				$scope.tokenExpired = true;
			else
				$scope.tokenExpired = false;


			if ( checkToken.loggedIn() )
				$scope.loggedIn = true;
			else
				$scope.loggedIn = false;


			if ( checkToken.isAdmin() )
				$scope.isAdmin = true;
			else
				$scope.isAdmin = false;

			return 'partials/site/navigation.html';
		}
	};


	$scope.isActive = function ( path ) {
		return $location.path() === path;
	};

	$scope.$watch(function(){
		$scope.cart = cartSrv.show().length;
	});

	$scope.logout = function () {
		checkToken.del();
		location.reload();
	};

}]);


