main_module.controller('friendDataController',function($scope,friendDataFactory){
    $scope.name="by Jesse James";
    $scope.temp = ['Aku Ankka','Mikki Hiiri','Hessu Hopo','Hannu Hanhi'];
   // console.log('friendDataController loaded');
    if(friendDataFactory.friendsArray.length === 0)
    {
        var response = friendDataFactory.getFriendData();
        response.then(function(data){
            friendDataFactory.friendsArray = data;
            $scope.friendData = data;
        });
    }else{
        $scope.friendData = friendDataFactory.friendsArray;
    }
});