main_module.factory('loginFactory',function($http){
    var factory = {};
    
    factory.startLogin = function(data){
        console.log(data);
    }
    
    return factory;
});