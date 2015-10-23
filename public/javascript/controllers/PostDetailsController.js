(function() {
	'use strict';
	angular.module('app')
	.controller('PostDetailsController', PostDetailsController);
	function PostDetailsController($state, $stateParams, HomeFactory) {
		var vm = this;

		if($stateParams.id) {
			HomeFactory.getDetailsById($stateParams.id).then(function(res) {
				vm.detail = res;
			});
		}

		vm.addComment = function() {
			HomeFactory.createComment(vm.comment, $stateParams.id).then(function(res) {
				vm.detail = res;
				console.log(res);
			});
		};


	}
})();
