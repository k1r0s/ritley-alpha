

/**
 * init - inicializamos la aplicación
 *
 */
function init(){
    console.log("bootstraping..");

    /**
     * inicializamos los servicios
     */
    require("./service-pool").then(postInit);
}


/**
 * postInit esta función es llamada después de la inicialización de los servicios
 *
 */
function postInit(){
    console.log("postinit done!");

    /**
     * inicializamos los aspectos
     */
    require("./aspect-pool");

    var Controller = require("./Controller");


    /**
     * inicializamos el controlador de nuestro recurso
     */
    new Controller("pkm");
    // new Controller("user");
    // new Controller("digimon");
}

init();
