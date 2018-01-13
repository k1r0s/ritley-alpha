const { extend } = require("kaop");
const { setConfig, AbstractResource } = require("../");

setConfig(require("./ritley.cfg"));

const DummyResource = extend(AbstractResource, {
  get(req, res) {
    console.log(req.url);
    console.log(req.query);
    console.log(req.body);
  }
});

new DummyResource("/dummy");
