var angular = require("angular");
var angularRou = require("angular-route");
var angularMsg = require("angular-messages");
var angularMat = require("angular-material");

window.APP = angular.module("pokedex", [angularRou, angularMsg, angularMat]);

APP.constant("APIROOT", "http://localhost:8000/");
APP.factory("resourceAdapter", require("./service/resourceAdapter"));
APP.controller("globalController", require("./controller/globalController"));
APP.controller("listController", require("./controller/listController"));
APP.controller("formController", require("./controller/formController"));

APP.config(function($routeProvider){

    $routeProvider.when("/", { template: require("./tpl/list.tpl") });
    $routeProvider.when("/pkm/:id", { template: require("./tpl/form.tpl") });
    $routeProvider.when("/about", { template: require("./tpl/about.tpl") });
    $routeProvider.otherwise("/");
});
