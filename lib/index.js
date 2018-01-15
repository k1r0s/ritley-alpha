const { extend } = require("kaop");
const AbstractResource = require("./abstract-resource");
const { setConfig } = require("./config");

module.exports = {
  setConfig,
  AbstractResource,
  extend
}
