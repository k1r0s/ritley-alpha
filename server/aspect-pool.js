var kaop = require("kaop");


/**
 * más info sobre la lib
 * https://github.com/k1r0s/kaop
 * https://github.com/k1r0s/kaop-ts
 */

kaop.Decorators.push(
    kaop.Phase.EXECUTE,

    /**
     * resource - este advice debe ser definido en el constructor de una clase
     * transforma la clase en un controlador de recurso. El advice espera que la
     * clase anotada tenga los siguientes métodos [get, post, put, delete].
     *
     * el advice añade un listener para el evento 'request'
     *
     * el advice comprueba si la url que se está solicitando empieza por $$base
     * que en este caso es nuestra ruta para el servicio API rest
     *
     * en caso de cumplirse la condición el advice llama al método correspondiente
     * en función del verbo http solicitado
     */
    function resource(){
        $$nodeInstance.on("request", function(req, res) {
            if(req.url.startsWith($$base) && req.url.search(meta.args[0]) > -1){
                this[req.method.toLocaleLowerCase()].call(this, req, res);
            }
        }.bind(this));
    },


    /**
     * parseQuery - este advice se encarga de parsear los parámetros de queryString
     * que contiene la url y guardarlos en la nueva propiedad 'query' del primer argumento (res)
     */
    function parseQuery(){
        var req = meta.args[0];
        req.query = $$parse(req.url);
    },

    /**
     * parseBody - este advice se encarga de recibir el payload de la request,
     * cuando finaliza el proceso lo guarda en la nueva propiedad 'body' (evaluado)
     * y delega en el siguiente advice
     *
     * Este advice eliminará todas las propiedades del body que empiecen por '_'
     *
     */
    function parseBody(){
        var req = meta.args[0];
        req.body = "";
        req.on("data", function(d){
            req.body += d;
        });
        req.on("end", function(){
            req.body = JSON.parse(req.body);
            for (var variable in req.body) {
                if (variable.startsWith("_")) {
                    delete req.body[variable];
                }
            }
            next();
        });
    },

    /**
     * $inject  - Ejemplo de DI. Este advice se encarga de recorrer los parámentros de la función anotada
     * analiza si alguno de ellos se llama igual que algún servicio definido.
     *
     * En caso afirmativo remplaza el argumento implementado con la instancia del servicio
     *
     */
    function $inject(){
        // recoger los argumentos del método
        var implementedArgs = /\((.*,?)*\)/g
        .exec(meta.method.toString())
        .pop()
        .split(",")
        .map(i => i.trim());
        for (var i = 0; i < implementedArgs.length; i++) {
            try{
                var localService = eval(implementedArgs[i]);
                if(localService){
                    meta.args[i] = localService;
                }
            } finally {
                continue;
            }
        }
    },

    /**
     * translateCRUD - este advice sencillamente define una nueva propiedad en el request
     * en función del verbo http
     *
     * por ejemplo, si el método es GET, define 'read' (req.action = 'read')
     *
     */
    function translateCRUD(){
        var req = meta.args[0];
        req.action = $$crud[req.method.toLocaleLowerCase()];
    },


    /**
     * writeResult - devuelve la respuesta para el cliente en función de los parámetros
     * devueltos en el método anotado. Normalmente devolverá el recurso serializado.
     * En caso de error devolverá un status 500
     */
    function writeResult(){
        var res = meta.args[1];
        if(meta.result.then){
            meta.result.then(function(result){
                res.statusCode = 200;
                res.setHeader("Access-Control-Allow-Origin", "*");
                res.write(JSON.stringify(result));
                res.end();
            });
            meta.result.catch(function(result){
                console.log(result);
                res.statusCode = 500;
                res.setHeader("Access-Control-Allow-Origin", "*");
                res.write(JSON.stringify({ message: "there was an error :(" }));
                res.end();
            });
        }else{
            var result = meta.result;
            res.statusCode = result.status;
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.write(JSON.stringify(result.body));
            res.end();
        }
    },

    /**
     * dataAssambly - aquí podría definirse el acceso a los datos por medio de un advice
     *
     */
    function dataAssambly(){

    }
);
