const { extend, override } = require("kaop");
const AbstractResourceController = require("../lib/abstract-resource-controller");
const { Log } = require("./logger");

module.exports = Controller = extend(AbstractResourceController, {
  get: [Log, function(req, res) {
    res.statusCode = 200;
    res.end();
  }],
  push: [Log, function(req, res) {
    res.statusCode = 200;
    res.end();
  }],
  put: [Log, function(req, res) {
    res.statusCode = 200;
    res.end();
  }],
  delete: [Log, function(req, res) {
    res.statusCode = 200;
    res.end();
  }],
  options() {}
});
