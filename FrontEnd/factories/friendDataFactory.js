main_module.factory('friendDataFactory',function($resource){
    var factory = {};
    
    factory.friendsArray = [];
    
    factory.getFriendData = function(){
            var resource = $resource('/friends',{},{'get':{method:'GET'}});
            return resource.query().$promise;
    }
    
    return factory;
});

/*
    factory.getFriendData = function(){
        if(factory.friendsArray.length === 0){
            var resource = $resource('/friends',{},{'get':{method:'GET'}});
            resource.query().$promise.then(function(data){
                
                factory.friendsArray = data;
                return factory.friendsArray;
                
            },function(err){
                return factory.friendsArray;
            });
        }
        else{
            return factory.friendsArray;
        }
    }
    */