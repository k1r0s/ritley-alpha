const { extend, override } = require("kaop");
const AbstractResource = require("../lib/abstract-resource");
const { Log } = require("./logger");

module.exports = Controller = extend(AbstractResource, {
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
