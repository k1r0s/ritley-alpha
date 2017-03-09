module.exports = function($scope, resourceAdapter, $mdToast, favManager){

    /**
     * init - esta función se ejecutará al inicializar la pantalla,
     * una vez el controlador haya sido interpretado
     */
    $scope.init = function(){

    };


    /**
     * fav - función para añadir un pkm a los favoritos,
     * el servicio devolverá 'false' si se tratan de añadir
     * mas de 10
     *
     * @param  {type} pkm description
     * @return {type}     description
     */
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


    /**
     * isFav - función para comprobar si un pkm se encuentra en el listado
     * de favoritos
     *
     * @param  {type} pkm description
     * @return {type}     description
     */
    $scope.isFav = function(pkm){
        return favManager.has(pkm.id);
    };


    /**
     * unfav - función para eliminar un pkm del listado de favoritos
     *
     * @param  {type} pkm description
     * @return {type}     description
     */
    $scope.unfav = function(pkm){
        delete pkm._fav;
        favManager.remove(pkm.id);
    };


    /**
     * delete - función para eliminar un pkm permanentemente :(    
     *
     * @param  {type} id description
     * @return {type}    description
     */
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
