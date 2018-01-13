const { cfg } = require("../package");
const { createClass, provider } = require("kaop");

const Config = createClass({
  cfg: null,
  constructor() {
    this.cfg = cfg;
  }
});

const configProvider = provider.singleton(Config);

module.exports = { configProvider };
