module.exports = function($scope, resourceAdapter, $mdToast, favManager){

    $scope.init = function(){

    };

    $scope.fav = function(pkm){
        if(!favManager.add(pkm.id)){
            //si, es un alert
            alert("No puedes añadir mas de 10!");
            // $mdToast.show(
            //   $mdToast.simple()
            //     .textContent('No puedes añadir mas de 10!')
            //     .position(asdasdasdasda)
            //     .hideDelay(2000)
            // );
            return;
        }
        pkm._fav = true;
    };

    $scope.isFav = function(pkm){
        return favManager.has(pkm.id);
    };

    $scope.unfav = function(pkm){
        delete pkm._fav;
        favManager.remove(pkm.id);
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
