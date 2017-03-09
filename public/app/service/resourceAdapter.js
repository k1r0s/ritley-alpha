
/**
 * module - servicio para facilitar interacciones con la API
 *
 * @param  {type} $rootScope se usa para definir una propiedad global (loading) en función del recurso llamado
 * @param  {type} $http      description
 * @param  {type} APIROOT    constante con la dirección de la API
 * @return {type}            description
 */
module.exports = function($rootScope, $http, APIROOT) {
    $rootScope.loading = {};

    /**
     * warnError - función recurrente para mostrar por consola los posibles errores
     * devueltos por la API
     *
     * @param  {type} res description
     * @return {type}     description
     */
    function warnError(res){
        console.warn(res);
    }

    /**
     * triggerAjaxState - método privado que modifica la propiedad global 'loading'
     *
     * @param  {type} resource description
     * @param  {boolean} loading?
     * @return {type}          description
     */
    function triggerAjaxState(resource, loading) {
        $rootScope.loading[resource] = loading;
    }


    /**
     * return - el servicio devuelve una función que a su vez devuelve 5 propiedades
     * [get, post, put, delete, postFile]. Estas propiedades son funciones que deben
     * ser llamadas con un callback que se ejecutará al finalizar la llamada con la
     * respuesta del servidor, en caso de error se mostrará un warning en la consola
     *
     * @param  {string} resource nombre del recurso
     * @param  {object} p        parámetros
     * @return {object}          {get, put, post, delete}
     */
    return function(resource, p) {
        return {
            get: function(cbk) {
                triggerAjaxState(resource, true);
                $http({
                        method: "GET",
                        url: APIROOT + "/" + resource,
                        params: p
                    })
                    .catch(warnError)
                    .then(cbk)
                    .then(function() {
                        triggerAjaxState(resource)
                    })
            },
            postFile: function(cbk) {
                triggerAjaxState(resource, true);
                $http({
                        method: "POST",
                        url: APIROOT + "/" + resource,
                        headers: {
                            'Content-Type': undefined
                        },
                        data: p
                    })
                    .catch(warnError)
                    .then(cbk)
                    .then(function() {
                        triggerAjaxState(resource)
                    })
            },
            post: function(cbk) {
                triggerAjaxState(resource, true);
                $http({
                        method: "POST",
                        url: APIROOT + "/" + resource,
                        data: p
                    })
                    .catch(warnError)
                    .then(cbk)
                    .then(function() {
                        triggerAjaxState(resource)
                    })
            },
            del: function(cbk) {
                triggerAjaxState(resource, true);
                $http({
                        method: "DELETE",
                        url: APIROOT + "/" + resource,
                        params: p
                    })
                    .catch(warnError)
                    .then(cbk)
                    .then(function() {
                        triggerAjaxState(resource)
                    })
            },
            put: function(cbk) {
                triggerAjaxState(resource, true);
                $http({
                        method: "PUT",
                        url: APIROOT + "/" + resource,
                        data: p
                    })
                    .catch(warnError)
                    .then(cbk)
                    .then(function() {
                        triggerAjaxState(resource)
                    })
            }
        }
    };
};
