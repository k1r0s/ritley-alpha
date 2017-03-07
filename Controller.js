var kaop = require("kaop");

module.exports = Controller = kaop.Class({
    uri: undefined,

    constructor: [function(resourceIdentifier){
        this.uri = resourceIdentifier;
    }, "resource"],

    get: ["translateCRUD", "$inject", function(req, res, $$ormInstance){
        //validate

        return $$ormInstance.do({
            action: req.action,
            entity: this.uri,
            where: req.query
        })
    }, "writeResult"],

    post: ["parseBody", "translateCRUD", "$inject", function(req, res, $$ormInstance){
        //validate

        return $$ormInstance.do({
            action: req.action,
            entity: this.uri,
            subject: req.body
        });
    }, "writeResult"],

    put: function(){},

    delete: function(){}
});
