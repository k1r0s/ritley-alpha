const ecstatic = require("ecstatic");
const http = require("http");
const { createClass, provider, inject } = require("kaop");
const { configProvider } = require("./config");

const NodeServer = createClass({
  server: null,
  constructor: [inject.args(configProvider), function(config) {
    const port = config.cfg.port;
    const staticDir = config.cfg.static;
    const basePath = config.cfg.base;

    this.server = http.createServer();
    this.server.listen(port);
    console.log(`running on port ${port}`);

    staticMiddleware = ecstatic({ root: `${staticDir}`, handleError: false });
    this.server.on("request", (req, res) => !req.url.startsWith(basePath) && staticMiddleware(req, res));
    console.log(`serving ${staticDir} as a static content`);
  }]
});

const nodeProvider = provider.singleton(NodeServer);

module.exports = { nodeProvider };
