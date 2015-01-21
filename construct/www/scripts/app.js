var app = angular.module("myApp", ['ngRoute', 'ngSanitize']);

document.addEventListener('deviceready', function () {
    if (navigator.notification) { // Override default HTML alert with native dialog
        window.alert = function (message) {
            navigator.notification.alert(
                message,    // message
                null,       // callback
                "Workshop", // title
                'OK'        // buttonName
            );
        };
    }
}, false);
myApp.config(function($routeProvider) {

    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $routeProvider
    // route for the home page
    .when('/index.html', {
        templateUrl : 'templating/angular-extensions/landing-page-extension.html',
        controller  : 'mainController'
    })

    // route for the plant page
    .when('/plant', {
        templateUrl : 'templating/angular-extensions/plant-page-extension.html',
        controller  : 'plantController'
    })

    // route for the diesel page
    .when('/diesel', {
        templateUrl : 'templating/angular-extensions/diesel-page-extension.html',
        controller  : 'dieselController'
    })

    // if none of the above states are matched, use this as the fallback
    .otherwise({redirect: '/'});

});


app.service('httpService',['$http', '$q', function($http, $q){// this dependancy injection is minifier safe
    var httpGet = function(path){
        return $http({
            methode: 'GET',
            url: path
        });
    };

//    var sendEmail = function(mail){
//        console.log(mail);
//        var d = $q.defer();
//        $http({
//            methode: 'POST',
//            data: mail,
//            url: '/php/form-data-test/angular-form-data-test.php'
//        })
//        .success(function(data, status, header){
//            d.resolve(data);
//            console.log(data);
//        })
//        .error(function(data, status, header){
//            d.reject(data);
//        });
//        return d.promise;
//    };

    return {
        httpGet: httpGet//,
        //sendEmail: sendEmail
    };
}]);

app.directive('dieselPageExtension', function() {
    return {
        restrict: 'AE',
        templateUrl: 'templating/angular-extensions/diesel-page-extension.html'
    };
});
app.directive('plantPageExtension', function() {
    return {
        restrict: 'AE',
        templateUrl: 'templating/angular-extensions/plant-page-extension.html'
    };
});
app.controller('dieselController',['$scope', 'httpService', function($scope, httpService){
    alert('Diesel Controller loaded');
    //var data = exploreRecipeData;
    //httpService.httpGet("/api/get_category_posts/?category_slug=blog")
    //.success(function(data, status, headers){
    //$scope.exploreRecipeInfo = [];
    //$scope.exploreRecipeInfo.push({
    //    //featured: data.post.acf.featured_image
    //});
    //console.log($scope.exploreRecipeInfo);
    //})
    //.error(function(data, status, headers){
    //
    //});
}]);
app.controller('mainController',['$scope', 'httpService', function($scope, httpService){

    //var data = exploreRecipeData;
    //httpService.httpGet("/api/get_category_posts/?category_slug=blog")
    //.success(function(data, status, headers){
    //$scope.exploreRecipeInfo = [];
    //$scope.exploreRecipeInfo.push({
    //    //featured: data.post.acf.featured_image
    //});
    //console.log($scope.exploreRecipeInfo);
    //})
    //.error(function(data, status, headers){
    //
    //});
}]);
app.controller('plantController',['$scope', 'httpService', function($scope, httpService){
    alert('Plant Controller loaded');
    //var data = exploreRecipeData;
    //httpService.httpGet("/api/get_category_posts/?category_slug=blog")
    //.success(function(data, status, headers){
    //$scope.exploreRecipeInfo = [];
    //$scope.exploreRecipeInfo.push({
    //    //featured: data.post.acf.featured_image
    //});
    //console.log($scope.exploreRecipeInfo);
    //})
    //.error(function(data, status, headers){
    //
    //});
}]);
