// This is the way you define controllers
// the main_module variable is defined in mainModule.js file (loc in module //folder)
// he first argument is the name of the controller. This is important 
// because you use this name when you want oto use controller in some view
// The $scope object is the glue between the view and controller.
// Use this object to transfer data between view and controller

main_module.controller('controllerLogin',function($scope,loginFactory){
    //var user = $scope.user;
    //$scope.pass="diipadaapa";
    
    $scope.loginClicked = function(){
        console.log('login pressed');
        var tmp = {
            username:$scope.user,
            password:$scope.pass
        }
        loginFactory.startLogin(tmp);
    }
    $scope.registerClicked = function(){
        console.log('register pressed');
    }
});