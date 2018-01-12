const ecstatic = require("ecstatic");
const http = require("http");
const { createClass, provider, inject } = require("kaop");
const { configProvider } = require("./config");

const NodeServer = createClass({
  server: null,
  constructor: [inject.args(configProvider), function(config) {
    this.server = http.createServer();
    this.server.listen(config.port);
    console.log("running on port " + process.env.PORT || pkg.cfg.port);

    staticMiddleware = ecstatic({ root: __dirname + "/.." + config.static, handleError: false });
    this.server.on("request", (req, res) => !req.url.startsWith(config.base) && staticMiddleware(req, res));
    console.log("serving " + __dirname + "/.." + config.static);
  }]
});

const nodeProvider = provider.singleton(NodeServer);

module.exports = { nodeProvider };
