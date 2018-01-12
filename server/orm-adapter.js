const korm = require("korm");
const { createClass, provider, inject } = require("kaop");
const { configProvider } = require("./config");

const OrmAdapter = createClass({
  ready: null,
  constructor: [inject.args(configProvider), function(config) {
    this.ready = korm.open(config, config.models);
  }]
});

const ormProvider = provider.singleton(OrmAdapter);

module.exports = { ormProvider };
