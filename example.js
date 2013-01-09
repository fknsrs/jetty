#!/usr/bin/env node

var Jetty = require("./index");

var jetty = new Jetty();
jetty.pipe(process.stdout);

jetty.clear().hideCursor();

var i = 0;
setInterval(function() {
  i += 0.025;

  var x = Math.round(Math.cos(i) * 25 + 50),
      y = Math.round(Math.sin(i) * 10 + 20);

  jetty.moveTo(x, y).write(".");
}, 5);
