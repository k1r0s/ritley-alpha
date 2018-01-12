const { createClass } = require("kaop");

module.exports = AbstractResourceController = createClass({
  constructor(resourceIdentifier, node) {
    node.on("request", (req, res) =>
      (req.url.startsWith($$base) && req.url.includes(meta.args[0])) &&
        this[req.method](req, res));
  }
})
