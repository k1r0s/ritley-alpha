module.exports = function($scope, resourceAdapter, $route, $location){

    $scope.init = function(){
        if(isNaN($route.current.params.id)){
            $scope.model = {};
        }else{
            var id = parseInt($route.current.params.id);
            // pkm => pkm.id === id
            $scope.model = $scope.APP.pkmList.find(function(pkm){
                return pkm.id === id;
            });
        }
    };

    $scope.save = function(){
        var payload = angular.copy($scope.model);
        delete payload._fev;
        if(payload.id) {
            updatePkm(payload);
        } else {
            createPkm(payload);
        }
    };

    function updatePkm(payload){
        resourceAdapter("pkm", payload).put(handleResponse);
    }

    function createPkm(payload){
        resourceAdapter("pkm", payload).post(handleResponse);
    }

    function handleResponse(res){
        if(res.status === 200){
            var newPkm = angular.copy($scope.model);
            if($scope.model.id){
                // pkm => pkm.id === id
                var index = $scope.APP.pkmList.findIndex(function(pkm){
                    return pkm.id === $scope.model.id;
                });
                $scope.APP.pkmList[index] = newPkm;
            }else{
                newPkm.id = res.data.pop().id;
                $scope.APP.pkmList.push(newPkm);
            }
            $location.path('list');
        } else {
            console.error(":( ...");
        }

    }
};
