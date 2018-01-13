const { createClass, provider } = require("kaop");

const setConfig = props => Config.cfg = props;

const Config = createClass({
  cfg: null,
  constructor() {
    this.cfg = Config.cfg;
  }
});

const configProvider = provider.singleton(Config);

module.exports = { configProvider, setConfig };
