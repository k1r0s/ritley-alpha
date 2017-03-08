module.exports = function($scope, resourceAdapter, $http){
    $scope.init = function(){
        $scope.APP = {
            pkmList: [],
            pkmTypes: []
        };

        fetchTypesList();
    }

    function fetchPkmList(){
        resourceAdapter("pkm").get(function(res){
            $scope.APP.pkmList = res.data.map(processList);
        });
    }

    function processList(rawPkm){
        var pkm = rawPkm;
        pkm._type1 = $scope.APP.pkmTypes[rawPkm.type1];
        pkm._type2 = $scope.APP.pkmTypes[rawPkm.type2];
        return pkm;
    }

    function fetchTypesList(){
        $http.get("app/pkmTypes.json").then(function(res){
            $scope.APP.pkmTypes = res.data;
            fetchPkmList();
        });
    }
}
