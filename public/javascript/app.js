(function() {
	'use strict';
	angular.module('app', ['ui.router'])
	.config(Config);
	function Config($stateProvider, $urlRouterProvider, $httpProvider) {
		$stateProvider.state('Home',{
			url: '/',
			templateUrl: 'views/home.html'
		}).state('Login_Register', {
			url: '/login',
			templateUrl: 'views/login_register.html'
		}).state('CreatePost', {
			url: '/create',
			templateUrl: 'views/CreatePost.html'
		}).state('PostDetails', {
			url: '/post/:id',
			templateUrl: 'views/postDetails.html'
		});
		$urlRouterProvider.otherwise('/');
		console.log($httpProvider);
		$httpProvider.interceptors.push('AuthInterceptor');
	}
})();
