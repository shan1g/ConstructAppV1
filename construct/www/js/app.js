/**
 * Created by Shan on 1/22/2015.
 */
// angular functions
var app = angular.module("myApp", ['ngRoute', 'ngSanitize', 'ngAnimate']);
// paging provider and listener
app.config(function($routeProvider){
    $routeProvider
        .when('/', {
            templateUrl: "templates/landing-page-extension.html",
            controller: "HomeCtrl"
        })
        .when('/home', {
            templateUrl: "templates/landing-page-extension.html",
            controller: "HomeCtrl"
        })
        .when('/plant', {
            templateUrl: "templates/plant-page-extension.html",
            controller: "PlantCtrl"
        })
        .when('/plant/capture-start-time', {
            templateUrl: "templates/plant/plant-capture-start-time-extension.html",
            controller: "PlantCtrl"
        })
        .when('/plant/capture-stop-time', {
            templateUrl: "templates/plant/plant-capture-stop-time-extension.html",
            controller: "PlantCtrl"
        })
        .when('/plant/receive-plant', {
            templateUrl: "templates/plant/plant-receive-extension.html",
            controller: "PlantCtrl"
        })
        .when('/plant/update-plant', {
            templateUrl: "templates/plant/plant-update-extension.html",
            controller: "PlantCtrl"
        })
        .when('/plant/return-plant', {
            templateUrl: "templates/plant/plant-return-extension.html",
            controller: "PlantCtrl"
        })
        .when('/diesel', {
            templateUrl: "templates/diesel-page-extension.html",
            controller: "DieselCtrl"
        })
        .when('/diesel/capture-diesel-sent', {
            templateUrl: "templates/diesel/diesel-capture-sent-out-extension.html",
            controller: "DieselCtrl"
        })
        .when('/diesel/capture-diesel-tank', {
            templateUrl: "templates/diesel/diesel-capture-tank-extension.html",
            controller: "DieselCtrl"
        })
        .when('/diesel/capture-diesel-received', {
            templateUrl: "templates/diesel/diesel-capture-diesel-received-extension.html",
            controller: "DieselCtrl"
        })
        .otherwise({redirect: '/'});
});
app.service('loginService', ['$http', function($http){

}]);
app.factory('Auth', function(){
    var user;

    return{
        setUser : function(aUser){
            user = aUser;
        },
        isLoggedIn : function(){
            return(user)? user : false;
        }
    }
})

app.controller('appCtrl', ['$scope', '$rootScope', function($scope, $rootScope){
    $scope.changeBg = "";
    $rootScope.$watch('userConnected', function() {
        if ($rootScope.userConnected == true ){
            $scope.changeBg = 'connected';
        }
        else {
            $scope.changeBg = '';
        }
    });
}]);
app.controller('notificationCtrl', ['$scope', '$rootScope', function($scope, $rootScope){
    $rootScope.isActiveMessage = false;
    $scope.defaultMessage = '';
    $scope.notifications = "";
    $rootScope.$watch('message', function() {
        if ($rootScope.message != $scope.defaultMessage && $rootScope.message != null ){
            $rootScope.isActiveMessage = true;
            $scope.notifications = $rootScope.message;
        }
        else {
            $rootScope.isActiveMessage = false;
        }
    });


}]);
app.controller('HomeCtrl', ['$scope', 'Auth', '$rootScope', function($scope, Auth, $rootScope){
    $rootScope.isHome = true;
    $rootScope.isPage = false;
    //$rootScope.userConnected = false;
    $scope.loginData = [];

    $(document).foundation('offcanvas', 'reflow');

    // Triggered in the login modal to close it
    $scope.closeLogin = function() {
        $rootScope.loggedIn = 'connected';
        $rootScope.loading = false;
        $rootScope.userConnected = true;
        return $rootScope.userConnected;
    };

    $scope.connectUser = function() {
        $rootScope.loading = true;
        $rootScope.loggedIn = 'connecting';
        $rootScope.message = 'Please fill in your login details to connect';
    };
    // Perform the login action when the user submits the login form
    $scope.userAuth = function() {
        $rootScope.loading = true;
        $rootScope.message = 'Thank you ' + $scope.loginData.username + ' you are now connected';
        // Simulate a login delay. Remove this and replace with your login
        Auth.setUser($scope.loginData.username);
        // code if using a login system
        $scope.closeLogin();
    };

}]);
app.controller('PlantCtrl', ['$scope', '$rootScope', function($scope, $rootScope){
    $rootScope.isHome = false;
    $rootScope.isPage = true;
    $rootScope.loading = true;
    $rootScope.message = 'Select the process you would like to complete';
    $scope.plantData = [];


    $scope.handlePlantpages = function(target) {
        $rootScope.loading = true;
        $scope.navOption = target;

        return $scope.navOption;
    };
}]);
app.controller('DieselCtrl', ['$scope', '$rootScope', function($scope, $rootScope){
    $rootScope.isHome = false;
    $rootScope.isPage = true;
    $rootScope.loading = true;
    $rootScope.message = 'Select the process you would like to complete';
    $scope.dieselData = [];

    $scope.handleDieselpages = function(target) {
        $rootScope.loading = true;
        $scope.navOption = target;

        return $scope.navOption;
    };
}]);

// check if user logged in
app.run(['$rootScope', '$location', 'Auth', function ($rootScope, $location, Auth) {
    $rootScope.$on('$routeChangeStart', function (event) {

        if (!Auth.isLoggedIn()) {
            //console.log('DENY');
            $location.path('/');
            //event.preventDefault();

        }
        else {
            //console.log('ALLOW');
            $rootScope.loggedIn = 'connected';
            $rootScope.userConnected = true;
        }
    });
}]);

