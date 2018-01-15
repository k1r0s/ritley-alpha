const { setConfig, AbstractResource, extend } = require("../");

setConfig(require("./ritley.cfg"));

const BasicResource = extend(AbstractResource, {
  get(request, response) {
    console.log(request.query);
    response.statusCode = 200;
    response.end();
  },
  post(request, response) {
    console.log(request.body);
    response.statusCode = 200;
    response.end();
  },
});

new BasicResource("/dummy");
