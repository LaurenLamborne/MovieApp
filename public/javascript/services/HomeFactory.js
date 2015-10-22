(function() {
	'use strict';
	angular.module('app')
	.factory('HomeFactory', HomeFactory);

	function HomeFactory($http, $q) {
		var o = {};

		o.getAllPosts = function() {
			var q = $q.defer();
			$http.get('/api/post').then(function(res) {
				q.resolve(res.data);
			});
			return q.promise;
		};

		o.createPost = function(post) {
			var q = $q.defer();
			$http.post('/api/post/', post).then(function() {
				q.resolve();
			});
			return q.promise;
		};

		o.editPost = function(edditedPostObj) {
			console.log(edditedPostObj);
			var q = $q.defer();
			$http.put('/api/post/', edditedPostObj).then(function(res) {
				q.resolve(res.data);
			});
			return q.promise;
		};

		o.getDetailsById = function(id) {
			var q = $q.defer();
			$http.get('/api/post/' + id).then(function(res) {
				q.resolve(res.data);
			});
			return q.promise;
		};

		o.createComment = function(comment, postId) {
			var q = $q.defer();
			$http.post('/api/post/' + postId + '/comment', comment).then(function(res) {
				q.resolve(res.data);
			});
			return q.promise;
		};

		o.deletePost = function(id) {
			var q = $q.defer();
			$http.delete('/api/post/' + id).then(function(res) {
				q.resolve();
			});
			return q.promise;
		};



		return o;
	}
})();
