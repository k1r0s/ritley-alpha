var kaop = require("kaop");


/**
 * Controlador de recurso REST
 */
module.exports = Controller = kaop.Class({

    uri: undefined,


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
    constructor: [function(resourceIdentifier){
        this.uri = resourceIdentifier;
    }, "resource"],


    /**
     * get - Este método es llamado cada vez que se realiza un GET a la ruta
     * del recurso de la instancia
     *
     * @param  {type} req           description
     * @param  {type} res           description
     * @param  {type} $$ormInstance description
     * @return {type}               description
     */
    get: ["translateCRUD", "$inject", function(req, res, $$ormInstance){
        //validate


        /**
        * el servicio orm está suficientemente abstraido cómo para manejar
        * muchos tipos de operaciones CRUD. https://github.com/k1r0s/korm
         */

        // la promesa devuelta será manejada por el advice 'writeResult'
        return $$ormInstance.do({
            action: req.action,
            entity: this.uri,
            where: req.query
        });
    }, "writeResult"],

    /**
     * post - Este método es llamado cada vez que se realiza un POST a la ruta
     * del recurso de la instancia
     *
     * @param  {type} req           description
     * @param  {type} res           description
     * @param  {type} $$ormInstance description
     * @return {type}               description
     */
    post: ["parseBody", "translateCRUD", "$inject", function(req, res, $$ormInstance){
        //validate

        return $$ormInstance.do({
            action: req.action,
            entity: this.uri,
            subject: req.body
        });
    }, "writeResult"],

    /**
     * put - Este método es llamado cada vez que se realiza un PUT a la ruta
     * del recurso de la instancia
     *
     * @param  {type} req           description
     * @param  {type} res           description
     * @param  {type} $$ormInstance description
     * @return {type}               description
     */
    put: ["parseBody", "translateCRUD", "$inject", function(req, res, $$ormInstance){
        //aquí podríamos validar los parámetros

        return $$ormInstance.do({
            action: req.action,
            entity: this.uri,
            subject: req.body,
            where: { id: req.body.id }
        });
    }, "writeResult"],


    /**
    * delete - Este método es llamado cada vez que se realiza un DELETE a la ruta
    * del recurso de la instancia
     *
     * @param  {type} req           description
     * @param  {type} res           description
     * @param  {type} $$ormInstance description
     * @return {type}               description
     */
    delete: ["parseQuery", "translateCRUD", "$inject", function(req, res, $$ormInstance){
        //aquí podríamos validar los parámetros

        return $$ormInstance.do({
            action: req.action,
            entity: this.uri,
            where: { id: req.query.id }
        });
    }, "writeResult"],

    options: [function(){
        return { status: 200, body: "" };
    }, "writeResult"]
});
