const { createClass, inject } = require("kaop");
const { configProvider } = require("./config");
const url = require("url");


module.exports = AbstractResourceController = createClass({
  constructor: [inject.args(configProvider), function(resourceIdentifier, node, config) {
    node.server.on("request", (req, res) =>
      this.requestAllowed(req, config.cfg.base, resourceIdentifier) &&
        this.processRequest(req, res));
  }],
  requestAllowed(req, basePath, resourceIdentifier) {
    return req.url.startsWith(basePath) && req.url.includes(resourceIdentifier)
  },
  processRequest(req, res) {
    const query = url.parse(req.url, true).query;
    let body = "";
    req.on("data", d => body += d);
    req.on("end", () => this.dispatch(req, res, query, body));
  },
  dispatch(req, res, query, body) {
    req.body = body ? JSON.parse(body): null;
    req.query = query;
    const methodName = req.method.toLowerCase();
    this[methodName](req, res);
  }
})
