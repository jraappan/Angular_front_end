// This is the way you define controllers
// the main_module variable is defined in mainModule.js file (loc in module //folder)
// he first argument is the name of the controller. This is important 
// because you use this name when you want oto use controller in some view
// The $scope object is the glue between the view and controller.
// Use this object to transfer data between view and controller

main_module.controller('controllerLogin',function($scope,loginFactory,$location){
    
    $scope.loginClicked = function(){
        console.log('login pressed');
        var tmp = {
            username:$scope.user,
            password:$scope.pass
        }
        var waitPromise = loginFactory.startLogin(tmp);
        //Wait response from server
        waitPromise.then(function(data){
            console.log(data);
            $location.path('/list');
        },function(data){
            $('.error').text('Wrong username or password');
        });
    }
 
    $scope.registerClicked = function(){
        console.log('register pressed');
        var tmp = {
            username:$scope.user,
            password:$scope.pass
        }
        var response = loginFactory.startRegister(tmp);
        
        response.then(success,error);
    }
});

function success(data){
    alert('New person registered');
}
function error(data){
    alert('Registering failed. Username  already in use');
}