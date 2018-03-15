<p align="center">
  <a><img src="https://i.imgur.com/6BKD8jW.png"></a>
  <h2>Ritley JS</h2>
</p>


[![version](https://img.shields.io/npm/v/ritley.svg)](https://www.npmjs.com/package/ritley/)
[![dependencies](https://david-dm.org/k1r0s/ritley/status.svg)](https://david-dm.org/k1r0s/ritley/status.svg)
[![downloads](https://img.shields.io/npm/dm/ritley.svg)](https://www.npmjs.com/package/ritley)

#### About
Ritley is a small package __with only two dependencies__ that allows you to create REST applications in no time. You can define `Resources` as entities which handle requests to the server. Create as many instances as you need. Also you can extend (inherit) previous entities to build more complex behaviors. Ritley is build on top `kaop` OOP features. [You may use this package to provide Dependency Injection, Method overriding, Transaction Advices, etc](https://github.com/k1r0s/kaop).

#### Disclaimer
Ritley is still on development and it doesn't provide SSL support yet so, for now, I don't recommend use it on serious production environments.

#### Getting Started

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
First you should use `setConfig` to set up providers that will take care of configuring modules. Start defining your resource by extending from `AbstractResource`. Then you can create instances providing your entity name to be handled:
```javascript
// ./start.js
const { setConfig, AbstractResource, extend } = require("ritley");

setConfig(require("./ritley.cfg")); // load configuration

const BasicResource = extend(AbstractResource, {
  get(request, response) {          // curl localhost:8080/rest/dummy?id=1 -X GET -v
    console.log(this.$abspath);     // "rest/dummy"
    console.log(this.$uri);         // "dummy"
    console.log(request.query);     // { "id": 1 }
    response.statusCode = 200;
    response.end();
  },
  post(request, response) {         // curl localhost:8080/rest/dummy -X POST --data '{ "something": 1 }' -v
    console.log(request.toJSON());  // { "something": 1 }
    response.statusCode = 200;
    response.end();
  },
});

new BasicResource("dummy");
```

#### In deep (wip)
Ritley rely on NodeJS default http package to perform 99% of its operations. This library is only a shell that helps you organize your code into OOP patterns and Resources. Say you have the following configuration file:
```
{
  "base": `/api`,
  "static": `${__dirname}/dist`,
  "port": 8080,
}
```

- If you browse `localhost:8080` ritley will try to search your `/dist/index.html`

- If you browse `localhost:8080/js/bundle.js` ritley will try to search your `/dist/js/bundle.js`

Basically if any route doesn't start by the api prefix which is `base`, then __ecstatic__ package will try to resolve it using configuration's `static` entry.

So, if you're requesting a POST to `localhost:8080/api/resource1` from anywhere, lets say `axios` within your JavaScript application, ritley will look if there is any resource listening that route for that HTTP verb.

You may create different resources by extending from basic ones if you need to handle auth or other complex behavior.

#### Docs
Ritley uses Node's default http package to manage all stuff. You don't have to worry about learn another API but [this one](https://nodejs.org/api/http.html) that you may already known.

For convenience inside any AbstractResource subclass you can access:

```javascript
this.$uri       // resource name
this.$srv       // node http server (singleton)
this.$cfg       // ritley confg object (full)
this.$abspath   // `${this.$cfg.base}/${this.$uri}`;
```

#### Examples
Working 'getting started' [`example/` folder](https://github.com/k1r0s/ritley/tree/master/example)

#### Roadmap
- Create examples for advanced behaviors
- Setup testing
- SSL support
