// Here we create main module. First argument is the name of the module,
// the second one the '[] array' contains dependencies to other agular modules

var main_module = angular.module('main_module',['ngRoute','ngResource']);

// Create basic configuration for angular app.
// Configuration includes usually a router for views.
// The $routeProvider object comes from NgRoute module

main_module.config(function($routeProvider){
    $routeProvider.when('/',{
        templateUrl:'partial_login.html',
        controller:'controllerLogin'
    }).when('/list',{
        templateUrl:'partial_dataView.html',
        //controller:'controllerLogin'
    });
});