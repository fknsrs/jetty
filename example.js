#!/usr/bin/env node

var Jetty = require("./index");

var jetty = new Jetty();
jetty.pipe(process.stdout);

jetty.clear().hide();

var i = 0;
setInterval(function() {
  i += 0.025;

  var x = Math.round(Math.cos(i) * 25 + 50),
      y = Math.round(Math.sin(i) * 10 + 20);

  jetty.colour([Math.round(Math.cos(i / 10) * 3 + 3) + 31]).moveTo([y,x]).write(".");
}, 5);
