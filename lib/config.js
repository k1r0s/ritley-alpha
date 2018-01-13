const { createClass, provider } = require("kaop");

const setConfig = jsonConfig => Config.cfg = jsonConfig;

const Config = createClass({
  cfg: null,
  constructor() {
    this.cfg = Config.cfg;
  }
});

const configProvider = provider.singleton(Config);

module.exports = { configProvider, setConfig };
