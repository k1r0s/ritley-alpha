const { createClass, inject } = require("kaop");
const { configProvider } = require("./config");
const { nodeProvider } = require("./node-server");
const url = require("url");


module.exports = AbstractResource = createClass({
  $uri: undefined,
  $cfg: undefined,
  $srv: undefined,
  constructor: [inject.args(nodeProvider, configProvider), function(_uri, _node, _config) {
    this.$uri = _uri;
    this.$srv = _node.server;
    this.$cfg = _config.cfg;
    this.$abspath = `${this.$cfg.base}/${this.$uri}`;
    this.setup();
  }],
  setup() {
    this.$srv.on("request", (req, res) =>
      this.requestAllowed(req) && this.processRequest(req, res));
    console.log(`listenning requests for ${this.$abspath}`);
  },
  requestAllowed(req) {
    return req.url.startsWith(this.$abspath);
  },
  processRequest(req, res) {
    const body = [];
    req.on("data", d => body.push(d));
    req.on("end", () => this.dispatch(req, res, Buffer.concat(body)));
  },
  dispatch(req, res, buffer) {
    req.query = url.parse(req.url, true).query;
    req.buffer = buffer;
    req.body = buffer.toString();
    req.toJSON = _ => JSON.parse(buffer.toString());

    const methodName = req.method.toLowerCase();
    if(typeof this[methodName] !== "function") return console.warn(`unhandled '${methodName}' request on ${this.$abspath} resource`);
    this[methodName](req, res);
  }
})
