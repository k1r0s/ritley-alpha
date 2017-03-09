var angular = require("angular");
var angularRou = require("angular-route");
var angularMsg = require("angular-messages");
var angularMat = require("angular-material");
var pkg = require("../../package");

window.APP = angular.module("pokedex", [angularRou, angularMsg, angularMat]);

APP.constant("APIROOT", pkg.cfg.base);
APP.factory("resourceAdapter", require("./service/resourceAdapter"));
APP.factory("favManager", require("./service/favManager"));
APP.controller("globalController", require("./controller/globalController"));
APP.controller("listController", require("./controller/listController"));
APP.controller("formController", require("./controller/formController"));

APP.config(function($routeProvider, $mdThemingProvider) {

    $routeProvider.when("/", {
        template: require("./tpl/list.tpl")
    });
    $routeProvider.when("/pkm/:id", {
        template: require("./tpl/form.tpl")
    });
    $routeProvider.when("/about", {
        template: require("./tpl/about.tpl")
    });
    $routeProvider.otherwise("/");

    $mdThemingProvider.theme('default')
        .primaryPalette('red')
        .accentPalette('orange');

});
