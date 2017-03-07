var kaop = require("kaop");
var korm = require("korm");
var http = require("http");
var crud = require("./crudEnum");
var pkg = require("./package");

var nodeInstance, ormInstance, initSuccess;

//create node instance as service
nodeInstance = http.createServer();
nodeInstance.listen(pkg.cfg.port);

//create orm instance as service
ormInstance = korm;
initSuccess = ormInstance.open(
    pkg.cfg,
    pkg.cfg.models
);

//define services as local properties in advices
kaop.Decorators.locals = {
    $$nodeInstance: nodeInstance,
    $$ormInstance: ormInstance,
    $$crud: crud
};

module.exports = initSuccess;
