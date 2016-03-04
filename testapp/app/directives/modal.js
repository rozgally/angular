'use strict';
testApp.directive('testModal',['$uibModal',function($uibModal){

	return{
		restrict:'AE',
		scope:{
			'closeAction':'&confirm',
			'stat':'@status'
		},
		link:function(scope,element,attrs){
			element.on('click',function(){
				var modalInstance = $uibModal.open({
					backdrop:'static',
					templateUrl:'partials/modal.html',
					scope:scope,
					controller:'modalController',
					resolve:{
						attributes:function(){return attrs;}
					}
				});
				modalInstance.result.then(function(){
					scope.closeAction();
				})
			})
		}
	};
}]);

testApp.controller('modalController',['$scope','$uibModalInstance','attributes',function($scope,$uibModalInstance,attributes){
	$scope.ok = function(){
		$uibModalInstance.close();
	};
	$scope.cancel = function(){
		$uibModalInstance.dismiss('cancel');
	};
}]);