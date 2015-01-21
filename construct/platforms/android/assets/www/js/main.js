var app = angular.module("myApp", ['ngRoute', 'ngSanitize']);

// paging provider and listener
app.config(function($routeProvider){
	$routeProvider.when('/', {
		templateUrl: "templates/landing-page-extension.html",
		controller: "HomeCtrl"
	})
	.when('/plant', {
		templateUrl: "templates/plant-page-extension.html",
		controller: "PlantCtrl"
	})
	.when('/diesel', {
		templateUrl: "templates/diesel-page-extension.html",
		controller: "DieselCtrl"
	})
	.otherwise({redirect: '/'});
});

app.service('mailService', ['$http', '$q', function($http, $q){
	var page = 0;
	
	var getMail = function() {		
		var paging = page + 1;
		page = paging;
		return $http.jsonp('http://api.dribbble.com/shots/popular?page=' + paging + '&callback=JSON_CALLBACK');
	};
	
	var sendEmail = function(mail) {
		var d = $q.defer();
		alert(mail);
		$http({
			method: 'POST',
			data: mail,
			url: '/api/send'
		}).success(function(data, status, headers){
			d.resolve(data);
		}).error(function(data, status, headers){
			d.reject(data);
		});
		return d.promise;
	};
	
	return {		
		getMail: getMail,
		sendEmail: sendEmail
	};
}]);


app.controller('PlantCtrl', ['$scope', 'mailService', '$rootScope', function($scope, mailService, $rootScope){
	$scope.email = [];

	var getMessages = mailService.getMail()
	.success(function(data, status, error, paging){
		//console.log(paging);
		$scope.email = data.shots;
		
	})
	.error(function(status, error){
		
	});
	getMessages;
	
	$scope.getMessages = function() {
		$rootScope.loading = true;
		var getMessages = mailService.getMail()
		.success(function(data, status, error, paging){
			$scope.email = data.shots;
			$rootScope.loading = false;
		})
		.error(function(status, error){
			$rootScope.loading = false;
		});
		getMessages;
	};
}]);

app.controller('DieselCtrl', ['$scope', '$rootScope', 'mailService', function($scope, $rootScope, mailService){

}]);
