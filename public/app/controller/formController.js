module.exports = function($scope, resourceAdapter, $route){
    $scope.init = function(){
        if($route.current.params === "new"){
            $scope.model = {}
        }else{
            $scope.model = $scope.APP.pkmList[$route.current.params];
        }
    }
}
