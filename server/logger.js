const acho = require("acho");
const { reflect } = require("kaop");

const print = acho({
  outputMessage: message => `${Date.now()} :: ${message}`
});

const Log = reflect.advice(meta => {
  const [req, res] = meta.args;

  print.info(`request made to ${req.url}`);
  print.info(`query %j`, req.query);
  print.info(`body %j`, req.body);
})

module.exports = { Log }
