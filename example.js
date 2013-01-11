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

  jetty.rgb(Math.round(Math.cos(i / 2) * 2 + 3), Math.round(Math.cos(i / 3) * 2 + 3), Math.round(Math.cos(i / 5) * 2 + 3)).moveTo([y,x]).write(".");
}, 5);
