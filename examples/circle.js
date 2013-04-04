#!/usr/bin/env node

var Jetty = require("../index");
var jetty = new Jetty(process.stdout);
jetty.clear().hide();

var i = 0;
setInterval(function() {
  i += 0.025;

  var x = Math.round(Math.cos(i) * 25 + 50),
      y = Math.round(Math.sin(i) * 13 + 20);

  jetty.rgb(
    Math.round(Math.random() * 215),
    Math.random() > 0.5
  ).moveTo([y,x]).text(".");
}, 5);
