// Here we create main module. First argument is the name of the module,
// the second one the '[] array' contains dependencies to other agular modules

var main_module = angular.module('main_module',['ngRoute','ngResource','flash']);

function loginRequired($q,$resource,$location){
    // Create a promise
    var deferred = $q.defer();
    $resource('/isLogged').query().$promise.then(function success(){
        // Mark promise to be solved (or resolved)
        deferred.resolve();
        return deferred;
    }, function fail(){
        // Mark promise to be failed
        deferred.reject();
        // Go back to root context
        $location.path('/');
        return deferred;
    });
}

// Create basic configuration for angular app.
// Configuration includes usually a router for views.
// The $routeProvider object comes from NgRoute module

main_module.config(function($routeProvider){
    $routeProvider.when('/',{
        templateUrl:'partial_login.html',
        controller:'controllerLogin'
    }).when('/list',{
        templateUrl:'partial_dataView.html',
        controller:'friendDataController',
        resolve:{loginRequired:loginRequired}
    }).when('/add',{
        templateUrl:'partial_addView.html',
        controller:'controllerAdd',
        resolve:{loginRequired:loginRequired}
    });
});