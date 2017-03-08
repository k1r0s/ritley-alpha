var kaop = require("kaop");
var korm = require("korm");
var http = require("http");
var ecstatic = require("ecstatic");
var crud = require("./CrudEnum");
var pkg = require("../package");

var nodeInstance, ormInstance, initSuccess;

//create node instance as service
nodeInstance = http.createServer(
    //serve static content
    ecstatic({ root: __dirname + pkg.cfg.static })
);
nodeInstance.listen(process.env.PORT || pkg.cfg.port);
console.log("running on port " + process.env.PORT || pkg.cfg.port);

//create orm instance as service
ormInstance = korm;
initSuccess = ormInstance.open(
    pkg.cfg,
    pkg.cfg.models
);

//declare services as local properties in advices
kaop.Decorators.locals = {
    $$base: pkg.cfg.base,
    $$nodeInstance: nodeInstance,
    $$ormInstance: ormInstance,
    $$crud: crud
};

module.exports = initSuccess;
