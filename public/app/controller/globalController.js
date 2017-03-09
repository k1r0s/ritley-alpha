
/**
 * module - controlador principal de la app
 *
 * @param  {type} $scope          description
 * @param  {type} resourceAdapter servicio que encapsula $http para acceder a recursos
 * @param  {type} $http           description
 * @param  {type} favManager      servicio responsable de añadir los pkm favoritos al sessionStorage
 * @return {type}                 description
 */
module.exports = function($scope, resourceAdapter, $http, favManager){


    /**
     * init - esta función se ejecutará al inicializar la pantalla,
     * una vez el controlador haya sido interpretado
     */
    $scope.init = function(){
        $scope.APP = {
            pkmList: [],
            pkmTypes: []
        };

        fetchTypesList();
    };


    /**
     * fetchPkmList - función privada del controlador que comunica con la
     * api para recoger el listado completo de pkm
     *
     * @return {type}  description
     */
    function fetchPkmList(){
        resourceAdapter("pkm").get(function(res){
            $scope.APP.pkmList = res.data.map(processList);
        });
    }



    /**
     * processList - predicado para transformar la respuesta del servidor,
     * básicamente añadir referencias a otros objetos, estados, tipos..
     *
     * @param  {type} rawPkm description
     * @param  {type} i      description
     * @param  {type} arr    description
     * @return {type}        description
     */
    function processList(rawPkm, i, arr){
        var pkm = rawPkm;
        pkm._type1 = $scope.APP.pkmTypes[rawPkm.type1];
        pkm._type2 = $scope.APP.pkmTypes[rawPkm.type2];
        pkm._fev = arr[rawPkm.f_ev];
        pkm._fav = !!favManager.has(rawPkm.id);
        return pkm;
    }


    /**
     * fetchTypesList - usada para recoger los tipos de pkm de un archivo estático
     *
     * @return {type}  description
     */
    function fetchTypesList(){
        // cómo caso concreto usamos el servicio $http directamente
        $http.get("app/pkmTypes.json").then(function(res){
            $scope.APP.pkmTypes = res.data;
            // queremos recoger los pkm después de tener los tipos
            fetchPkmList();
        });
    }
};
