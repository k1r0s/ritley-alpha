const pkg = require("../package");
const { createClass, provider } = require("kaop");

const Config = createClass({
  package: null,
  constructor() {
    this.package = pkg;
  }
});

const configProvider = provider.singleton(Config);

module.exports = { configProvider };
