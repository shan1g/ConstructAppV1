/**
 * Created by Shan on 1/22/2015.
 */
// angular functions
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
app.service('plantService', ['$http', '$q', function($http, $q){
    var page = 0;

    var getDetails = function() {
        var paging = page + 1;
        page = paging;
        return $http.jsonp('http://api.dribbble.com/shots/popular?page=' + paging + '&callback=JSON_CALLBACK');
    };

    return {
        getDetails: getDetails
    };
}]);

app.controller('HomeCtrl', ['$scope', '$rootScope', function($scope, $rootScope){
    $rootScope.isHome = true;
    $rootScope.isPage = false;
    $(document).foundation('offcanvas', 'reflow');
}]);
app.controller('PlantCtrl', ['$scope', 'plantService', '$rootScope', function($scope, plantService, $rootScope){
    $rootScope.isHome = false;
    $rootScope.isPage = true;
    $rootScope.loading = true;
    $scope.plantData = [];


    var getFirstDetails = plantService.getDetails()
        .success(function(data, status, error, paging){
            $scope.plantData = data.shots;
            $rootScope.loading = false;
        })
        .error(function(status, error){
            $rootScope.loading = false;
        });
    getFirstDetails;

    $scope.getMessages = function() {
        $rootScope.loading = true;
        var getMessages = plantService.getDetails()
            .success(function(data, status, error, paging){
                $scope.plantData = data.shots;
                $rootScope.loading = false;
            })
            .error(function(status, error){
                $rootScope.loading = false;
            });
        //getMessages;
    };
}]);
app.controller('DieselCtrl', ['$scope', '$rootScope', function($scope, $rootScope){
    $rootScope.isHome = false;
    $rootScope.isPage = true;
}]);

