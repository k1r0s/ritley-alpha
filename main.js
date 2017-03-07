function init(){
    console.log("bootstraping..");
    require("./services").then(postInit);
}

function postInit(){
    console.log("postinit done!");
    require("./aspects");

    var Controller = require("./Controller");

    new Controller("pkm");
}

init();
