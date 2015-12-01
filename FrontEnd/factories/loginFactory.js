main_module.factory('loginFactory',function(){
    var factory = {};
    
    factory.startLogin = function(data){
        console.log(data);
    }
    
    return factory;
});