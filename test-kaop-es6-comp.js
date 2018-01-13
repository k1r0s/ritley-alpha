const { createClass } = require("kaop");

const Test = createClass({
  constructor(_salute) {
    this.salute = _salute
  }
})

class SuperTest extends Test {
  constructor() {
    super("Hi")
  }

  printSalute() {
    console.log(this.salute)
  }
}

let t = new SuperTest // TypeError: Class constructor SuperTest cannot be invoked without 'new'

t.printSalute();
