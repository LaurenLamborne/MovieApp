(function() {
	'use strict';
	angular.module('app', ['ui.router'])
	.config(Config);
	function Config($stateProvider, $urlRouterProvider, $httpProvider) {
		$stateProvider.state('Home',{
			url: '/',
			templateUrl: 'views/Home.html'
		}).state('Login_Register', {
			url: '/login',
			templateUrl: 'views/login_register.html'
		}).state('CreatePost', {
			url: '/create',
			templateUrl: 'views/createPost.html'
		}).state('PostDetails', {
			url: '/post/:id',
			templateUrl: 'views/postDetails.html'
		});
		$urlRouterProvider.otherwise('/');
		console.log($httpProvider);
		$httpProvider.interceptors.push('AuthInterceptor');
	}
})();
