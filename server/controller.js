const { extend, inject, override } = require("kaop");
const AbstractResourceController = require("./abstract-resource-controller");
const { nodeProvider } = require("./node-server");
const { ormProvider } = require("./orm-adapter");
/**
 * Controlador de recurso REST
 */
module.exports = Controller = extend(AbstractResourceController, {

    uri: null,
    nodeInstance: null,
    ormInstance: null,

    /**
     * constructor - el constructor del controlador asigna el recurso
     * a una variable de instancia.
     *
     * Al finalizar su ejecuión ejecutará el advice 'resource' sobre el
     * contexto de esta instancia para mutar su comportamiento
     *
     * @param  {type} resourceIdentifier description
     * @return {type}                    description
     */
    constructor: [
      override.implement,
      inject.args(nodeProvider, ormProvider),
      function(superClass, resourceIdentifier, node, orm){
        console.log(arguments)

        superClass(resourceIdentifier, node);
        this.nodeInstance = node;
        this.ormInstance = orm;
      }
    ],

    GET() {},
    PUSH() {},
    PUT() {},
    DELETE() {},
    OPTIONS() {}

/*
    get: ["translateCRUD", "$inject", function(req, res, $$ormInstance){
        //validate


        return $$ormInstance.do({
            action: req.action,
            entity: this.uri,
            where: req.query
        });
    }, "writeResult"],

    post: ["parseBody", "translateCRUD", "$inject", function(req, res, $$ormInstance){

        return $$ormInstance.do({
            action: req.action,
            entity: this.uri,
            subject: req.body
        });
    }, "writeResult"],

    put: ["parseBody", "translateCRUD", "$inject", function(req, res, $$ormInstance){

        return $$ormInstance.do({
            action: req.action,
            entity: this.uri,
            subject: req.body,
            where: { id: req.body.id }
        });
    }, "writeResult"],


    delete: ["parseQuery", "translateCRUD", "$inject", function(req, res, $$ormInstance){

        return $$ormInstance.do({
            action: req.action,
            entity: this.uri,
            where: { id: req.query.id }
        });
    }, "writeResult"],

    options: [function(){
        return { status: 200, body: "" };
    }, "writeResult"]

*/

});
