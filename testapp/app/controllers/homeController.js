'use strict';

var homeController = testApp.controller("homeController",['$rootScope','$scope','$log','testServices',function($rootScope,$scope,$log,testServices){
	var vm = this;
	$scope.listOptions = {
		enableFiltering:true,
		enableSorting:true,
		paginationPageSizes:[5,10,25],
		paginationPageSize:10,
		enableColumnResizing:true,
		columnDefs:[
			{name:'Student Id',field:'id',type:'number',enableHiding:false},
			{name:'Student Name',field:'name',enableHiding:false},
			{name:'Department',field:'dept',enableHiding:false},
			{name:'Joining Date',field:'joinDate',type:'date',cellFilter:'date:\'MM/dd/yyyy\'',enableHiding:false},
			{name:'Status',field:'status',enableHiding:false}
		]
	};

	vm.getStudentsList = function (){
		var listPromise = testServices.getStudents();
		listPromise.then(function(resp){
			if(resp){
			   $scope.listOptions.data = resp.data;
			}
		},function(){
			$log.error("Error occurred while retrieving the students list");
		})
		return listPromise;
	};
	$scope.printAlert =function(){
		alert("The parent controller method is called");
	}

	vm.getStudentsList();

}])