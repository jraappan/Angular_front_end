main_module.factory('friendDataFactory',function($resource,$http){
    var factory = {};
    
    factory.friendsArray = [];
    
    factory.getFriendData = function(){
            $http.defaults.headers.common['x-access-token'] = sessionStorage['token'];
            var resource = $resource('/friends',{},{'get':{method:'GET'}});
            return resource.query().$promise;
    }
    
    factory.addData = function(data){
        $http.defaults.headers.common['x-access-token'] = sessionStorage['token'];
        var req = $resource('/persons',{},{'post':{method:'POST'}});
        return req.post(data).$promise;
    }
    return factory;
});
