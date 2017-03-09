module.exports = function($scope, resourceAdapter, $route, $location){

    /**
     * init - esta función se ejecutará al inicializar la pantalla,
     * una vez el controlador haya sido interpretado
     *
     * básicamente se comprueba si hay algún parametro en la url y si este puede
     * ser transformado a integer, en caso afirmativo se deduce que es una 'edición'
     */
    $scope.init = function(){
        if(isNaN($route.current.params.id)){
            // nuevo
            $scope.model = {};
        }else{
            // edición
            var id = parseInt($route.current.params.id);
            $scope.model = $scope.APP.pkmList.find(function(pkm){ //pkm => pkm.id === id :(
                return pkm.id === id;
            });
        }
    };


    /**
     * save - se guardan los datos en la API, se comprueba si se trata de una edición
     * o una nueva entrada para llamar al servicio de la manera correspondiente
     *
     * @return {type}  description
     */
    $scope.save = function(){
        var payload = angular.copy($scope.model);
        delete payload._fev;
        if(payload.id) {
            updatePkm(payload);
        } else {
            createPkm(payload);
        }
    };


    /**
     * updatePkm - llama al recurso de la API usando un PUT
     *
     * @param  {type} payload POJO
     * @return {type}         description
     */
    function updatePkm(payload){
        resourceAdapter("pkm", payload).put(handleResponse);
    }


    /**
     * createPkm - llama al recurso de la API usando un POST
     *
     * @param  {object} payload POJO
     * @return {type}         description
     */
    function createPkm(payload){
        resourceAdapter("pkm", payload).post(handleResponse);
    }


    /**
     * handleResponse - cuando la llamada AJAX finaliza tenemos que incluir el recurso
     * en la lista de pkm, según si es una edición o creación tendremos que proceder
     * de forma distinta.
     *
     * @param  {type} res description
     * @return {type}     description
     */
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
