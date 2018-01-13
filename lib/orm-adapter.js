const korm = require("korm");
const { createClass, provider, inject } = require("kaop");
const { configProvider } = require("./config");

const OrmAdapter = createClass({
  connectionPromise: null,
  constructor: [inject.args(configProvider), function(config) {
    this.connectionPromise = korm.open(config.cfg, config.cfg.models);
  }],
  ready() {
    return this.connectionPromise;
  },
  exec(desc) {
    return korm.do(desc)
  }
});

const ormProvider = provider.singleton(OrmAdapter);

module.exports = { ormProvider };
