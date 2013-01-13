var Jetty = require('./index.js');
var tty = new Jetty(process.stdout);
tty.reset().clear().moveTo([0,0]);

// user defined things
var colors = {
  white: [5,5,5],
  blue:  [0,0,5],
  red:   [5,0,0]
};

var styles = {
  foo: function(str) {
    this
      .rgb(colors.blue)
      .text(str)
      .reset()
    ;
  },
  bar: function(str) {
    this
      .bold()
      .rgb(colors.red,1)
      .rgb(colors.white)
      .text(str)
      .reset()
    ;
  }
};

// jetty power go!
tty
  .text('error:', styles.bar)
  .text(' ')
  .text('something bad has happened', styles.foo)
  .text('\n\n')
;
