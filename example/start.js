const { setConfig, AbstractResource, extend } = require("../");

setConfig(require("./ritley.cfg"));

const BasicResource = extend(AbstractResource, {
  get(request, response) {
    console.log(this.$uri);
    console.log(request.query);
    response.statusCode = 200;
    response.end();
  },
  post(request, response) {
    console.log(request.toJSON());
    console.log(request.body);
    console.log(request.buffer);
    response.statusCode = 200;
    response.end();
  },
});

new BasicResource("dummy");
