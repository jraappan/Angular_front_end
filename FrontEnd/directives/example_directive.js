main_module.directive('ofExample',function(){
    var directive={};
    
    directive.restrict='AEC';   
    directive.scope={
        name:'@', // Text binding
        users:'=' // Two way binding
    }
    directive.link = function(scope,elem,attrs){
        $(elem).click(function(){
            console.log('directive clicked');
            scope.getWeather();
        });
    }
    // Directive can have own controller
    directive.controller = function($scope,$http){
        console.log('directive controller activated');
        $scope.getWeather = function(){
            $http.get('http://api.openweathermap.org/data/2.5/weather?q={oulu}').then(function(data){
                console.log(data);
                $scope.temp = data.temp;
            });
        }
    }
    /*
    directive.compile = function(elem,attrs){
        $(elem).css('background-color','lightgrey');
        return function link(scope,elem,attrs){
            console.log(scope.name);
            console.log(scope.users);
        }
    }
    */
    directive.templateUrl="/FrontEnd/directives/content.html";
    return directive;
});