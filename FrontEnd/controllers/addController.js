main_module.controller('controllerAdd',function($scope,friendDataFactory,Flash){
    
    $scope.addClicked = function(){
        $('#save').attr("disabled", true);
        console.log('add pressed');
        var tmp = {
            name:$scope.name,
            address:$scope.address,
            age:$scope.age
        }
        friendDataFactory.addData(tmp).then(function(data){
            friendDataFactory.friendsArray.push(data.data);
            Flash.create('success', 'New friend added!', 'custom-class');
            $scope.name = "";
            $scope.address = "";
            $scope.age = "";
            $('#save').attr("disabled", false);
        },function(error){
            $('#save').attr("disabled", false);
            Flash.create('warning', 'Failed to add friend!', 'custom-class');
        });
    }
});