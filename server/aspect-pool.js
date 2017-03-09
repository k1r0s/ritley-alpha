var kaop = require("kaop");

kaop.Decorators.push(
    kaop.Phase.EXECUTE,
    function resource(){
        $$nodeInstance.on("request", function(req, res) {
            if(req.url.startsWith($$base) && req.url.search(meta.args[0]) > -1){
                this[req.method.toLocaleLowerCase()].call(this, req, res);
            }
        }.bind(this));
    },
    function parseQuery(){
        var req = meta.args[0];
        req.query = $$parse(req.url);
    },
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
    function $inject(){
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
    function translateCRUD(){
        var req = meta.args[0];
        req.action = $$crud[req.method.toLocaleLowerCase()];
    },
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
    function dataAssambly(){

    }
);
