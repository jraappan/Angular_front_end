main_module.factory('loginFactory',function($resource){
    var factory = {};
    
    factory.startLogin = function(data){
        console.log(data);
        var req = $resource('/friends/login',{},{'post':{method:'POST'}});
        return req.post(data).$promise;
    }
    
    return factory;
});