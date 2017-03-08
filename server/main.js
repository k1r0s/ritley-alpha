function init(){
    console.log("bootstraping..");
    require("./service-pool").then(postInit);
}

function postInit(){
    console.log("postinit done!");
    require("./aspect-pool");

    var Controller = require("./Controller");

    new Controller("pkm");
}

init();
