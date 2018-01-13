const { extend, inject, reflect, override } = require("kaop");
const AbstractResourceController = require("./abstract-resource-controller");
const { nodeProvider } = require("./node-server");
const { ormProvider } = require("./orm-adapter");
const acho = require("acho");
const print = acho({
  outputMessage: message => `${Date.now()} :: ${message}`
});

const Log = reflect.advice(meta => {
  const [req, res] = meta.args;

  print.info(`request made to ${req.url}`)
  print.info(`query %j`, req.query)
  print.info(`body %j`, req.body)
})

module.exports = Controller = extend(AbstractResourceController, {

  nodeInstance: null,
  ormInstance: null,

  constructor: [
    override.implement,
    inject.args(nodeProvider, ormProvider),
    function(superClass, resourceIdentifier, node, orm){
      if(!resourceIdentifier) throw new Error("one argument is required as resource path")
      superClass(resourceIdentifier, node);
      this.nodeInstance = node;
      this.ormInstance = orm;
    }
  ],
  get: [Log, function() {}],
  push: [Log, function() {}],
  put: [Log, function() {}],
  delete: [Log, function() {}],
  options() {}
});

/*
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

*/
