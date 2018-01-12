
/**
 * carga de dependencias
 */
var url = require("url");
var crud = require("./CrudEnum");

var nodeInstance, ormInstance, initSuccess, staticMiddleware, urlParser;

//creamos la instancia del servicio para la persistencia
//create orm instance as service


urlParser = function(raw){
    return url.parse(raw, true).query;
};

// añadimos los servicios cómo variables locales para la librería de advices
//declare services as local properties in advices
kaop.Decorators.locals = {
    $$parse: urlParser,
    $$base: pkg.cfg.base,
    $$nodeInstance: nodeInstance,
    $$ormInstance: ormInstance,
    $$crud: crud
};

// devolvemos una promesa
module.exports = initSuccess;
