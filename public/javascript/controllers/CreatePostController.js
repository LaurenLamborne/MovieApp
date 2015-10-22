(function() {
	'use strict';
	angular.module('app')
	.controller('CreatePostController', CreatePostController);
	function CreatePostController(HomeFactory, $state) {
		var vm = this;
    vm.post = {};

    vm.createPost = function() {
      HomeFactory.createPost(vm.post).then(function() {
        $state.go('Home');
      });
    };


  }
})();
