testApp.factory('testServices',['$q','$resource','$http','$log',function($q,$resource,$http,$log){

	var getServiceCall = function(url){
		$log.info("Test Services:: getServiceCall");
		var deferred = $q.defer();
		var req = '';
		var success = function(successResp){
			if(successResp.status==='SUCCESS'){
				deferred.resolve(successResp);
			}else{
				deferred.reject(successResp);
			}
		}
		var error = function(errorResp){
			$log.error("Test Services:: getServiceCall"+JSON.stringify(errorResp));
			deferred.reject(errorResp);
		}
		var getServiceResource = $resource(url,{},{getServiceCall:{method:'GET'}});
		getServiceResource.getServiceCall(req,success,error);
	};

	var getStudentList = function(){
		$log.info("Test Services ::: getStudentsList");
		var data = $http.get('services/students.json').then(function(resp){
			return resp;
		},function(error){
			return false;
		});
		return data;
	};

	return{
		getService:getServiceCall,
		getStudents:getStudentList
	}
}]);