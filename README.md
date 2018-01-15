<center><img src="https://i.imgur.com/6BKD8jW.png"></center>
<center>
  <h2>Ritley JS</h2>
</center>

[![version](https://img.shields.io/npm/v/ritley.svg)](https://www.npmjs.com/package/ritley/)
[![dependencies](https://david-dm.org/k1r0s/ritley/status.svg)](https://david-dm.org/k1r0s/ritley/status.svg)
[![downloads](https://img.shields.io/npm/dm/ritley.svg)](https://www.npmjs.com/package/ritley)

#### About
Ritley is a small package to create REST applications. It allows to create `Resources` as entities which handle requests to the server. You can create as many instances as you need. Also you can extend previous entities to build more complex behaviors. Ritley is build on top `kaop` OOP features. [You may use this package to provide Dependency Injection, Method overriding, Transaction Advices, etc](https://github.com/k1r0s/kaop).

#### Getting Started

> You may prefer see it directly here [`example/` folder](https://github.com/k1r0s/ritley/tree/master/example)

Install ritley:
`npm install ritley --save`

Create a file structure like this:
```
├── public
│   └── index.html
├── ritley.cfg.js
├── start.js
└── package.json
```

Ritley expects to receive a configuration file with some parameters which define its behavior such as these:
```javascript
// ./ritley.cfg.js
module.exports = {
  "base": `/rest`,                  // api resource prefix
  "static": `${__dirname}/public`,  // static directory to serve your front
  "port": 8080,                     // port to be used by ritley to run the app
}
```
Then you can pass the config to the providers and start defining your resource by extending from `AbstractResource`. Then you can create instances providing your entity name to be handled:
```javascript
// ./start.js
const { setConfig, AbstractResource, extend } = require("ritley");

setConfig(require("./ritley.cfg")); // load configuration

const BasicResource = extend(AbstractResource, {
  get(request, response) { // curl localhost:8080/rest/dummy?id=1 -X GET -v
    console.log(request.query); // parsed { "id": 1 }
    response.statusCode = 200;
    response.end();
  },
  post(request, response) { // curl localhost:8080/rest/dummy -X POST --data '{ "something": 1 }' -v
    console.log(request.body); // parsed { "something": 1 }
    response.statusCode = 200;
    response.end();
  },
});

new BasicResource("/dummy");
```
> You may create different resources by extending from basic ones if you need to handle auth or other complex behavior.

#### Roadmap
- Create examples for advanced behaviors
- Setup testing
