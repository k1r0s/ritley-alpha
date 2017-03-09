module.exports = function($scope, resourceAdapter, $mdToast, favManager){

    $scope.init = function(){

    };

    $scope.fav = function(pkm){
        pkm._fav = true;
        if(!favManager.add(pkm)){
            $mdToast.show(
              $mdToast.simple()
                .textContent('No puedes añadir mas de 10!')
                .position($scope.getToastPosition())
                .hideDelay(3000)
            );
        }
    };
    
    $scope.isFav = function(pkm){
        return favManager.has(pkm);
    };

    $scope.unfav = function(pkm){
        delete pkm._fav;
        favManager.remove(pkm);
    };

    $scope.delete = function(id){
        resourceAdapter("pkm", {id: id}).del(function(res){
            if(res.status === 200){
                var index = $scope.APP.pkmList.findIndex(function(pkm){
                    return pkm.id === id;
                });

                $scope.APP.pkmList.splice(index, 1);
            }
        });
    };

};
