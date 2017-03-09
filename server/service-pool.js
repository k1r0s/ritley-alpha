
/**
 * carga de dependencias
 */
var kaop = require("kaop");
var korm = require("korm");
var http = require("http");
var url = require("url");
var ecstatic = require("ecstatic");
var crud = require("./CrudEnum");
var pkg = require("../package");

var nodeInstance, ormInstance, initSuccess, staticMiddleware, urlParser;

//creamos una instancia de node cómo servicio
//create node instance as service
nodeInstance = http.createServer();
nodeInstance.listen(process.env.PORT || pkg.cfg.port);
console.log("running on port " + process.env.PORT || pkg.cfg.port);

//servimos contenido estático en el directorio 'public' (en este caso)
//serve static content
console.log("serving " + __dirname + "/.." + pkg.cfg.static);
staticMiddleware = ecstatic({ root: __dirname + "/.." + pkg.cfg.static, handleError: false });
nodeInstance.on("request", function (req, res){
    if(!req.url.startsWith(pkg.cfg.base)){
        staticMiddleware(req, res);
    }
});

//creamos la instancia del servicio para la persistencia
//create orm instance as service
ormInstance = korm;
initSuccess = ormInstance.open(
    pkg.cfg,
    pkg.cfg.models
);

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
