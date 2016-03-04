describe('Home Controller Test suites',function(){
	var rootScope,scope,services,ctrl,q,deferred;
	beforeEach(module('testApp'));
	beforeEach(inject(function($rootScope,$log,$controller,$q){
		rootScope = $rootScope;
		scope = $rootScope.$new();
		q = $q;
		deferred = q.defer();
		services = jasmine.createSpyObj('testServices',['getService','getStudents']);
		services.getStudents.and.returnValue(deferred.promise);

		ctrl = $controller('homeController',{'$rootScope':rootScope,'$scope':scope,'$log':$log,'testServices':services});
	}));

	it('Should be able to create the controller',function(){
		expect(scope).toBeDefined();
		expect(ctrl).toBeDefined();		
	});

	it('Should have parameters defined for the grid',function(){
		expect(scope.listOptions).toBeDefined();
		expect(scope.listOptions).toEqual(jasmine.any(Object));
		expect(scope.listOptions.enableFiltering).toBeTruthy();
		expect(scope.listOptions.enableSorting).toBeTruthy();
		expect(scope.listOptions.columnDefs).toEqual(jasmine.anything(Object));
		expect(scope.listOptions.columnDefs.length).toBeGreaterThan(0);
	});

	it('Should be able retrieve the students',function(){
		var resp = {"data":[{
			"id":0,
			"name":"Rohan",
			"dept":"Electronics",
			"joinDate": 1456981200000,
			"status": "active"
		}, {
			"id": 1,
			"name": "Sai",
			"dept": "Computers",
			"joinDate": 1456981200000,
			"status": "active"
		}, {
			"id": 2,
			"name": "Geetha",
			"dept": "Electronics",
			"joinDate": 1456981200000,
			"status": "active"
		}]};
		spyOn(ctrl,'getStudentsList').and.callThrough();
		ctrl.getStudentsList();
		deferred.resolve(resp);
		scope.$digest();
		expect(ctrl.getStudentsList).toHaveBeenCalled();
		expect(services.getStudents).toHaveBeenCalled();
		expect(scope.listOptions.data).toBeDefined();
		expect(scope.listOptions.data.length).toBeGreaterThan(0);
	});

	it('Should be able to handle the error from the service',function(){
		var resp = {"status":"Error","msg":"Error Message"};
		spyOn(ctrl,'getStudentsList').and.callThrough();
		ctrl.getStudentsList();
		deferred.reject(resp);
		scope.$digest();
		expect(ctrl.getStudentsList).toHaveBeenCalled();
		expect(services.getStudents).toHaveBeenCalled();
		expect(scope.listOptions.data).not.toBeDefined();
	});

	it('Sample method to test parent controller from directive',function(){
		spyOn(scope,'printAlert').and.callThrough();
		scope.printAlert();
		expect(scope.printAlert).toHaveBeenCalled();
	});
});