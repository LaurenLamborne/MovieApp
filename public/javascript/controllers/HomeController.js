(function() {
	'use strict';
	angular.module('app')
	.controller('HomeController', HomeController);

	function HomeController(HomeFactory) {
		var vm = this;
		vm.edittedPost = {};

		HomeFactory.getAllPosts().then(function(res) {
			vm.posts = res;
		});

		vm.editPost = function(postId, edittedPost) {
		HomeFactory.editPost({IDofPostToEdit: postId, postEditted: edittedPost}).then(function(res) {
			console.log("Made it back");
			console.log(res);
			// vm.edittedPost = res;
			vm.edittedPost = null;
			// vm.showEdit = false;

			HomeFactory.getAllPosts().then(function(res) {
				vm.posts = res;
			});
		});
		};

		vm.deletePost = function(post) {
			HomeFactory.deletePost(post._id).then(function() {
				vm.posts.splice(vm.posts.indexOf(post), 1);
				});
		};

		vm.getCopy = function(post) {
			return angular.copy(post);
		};

	}
})();
