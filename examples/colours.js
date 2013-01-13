#!/usr/bin/env node

var Jetty = require('../index.js');
var tty = new Jetty(process.stdout);
tty.reset().clear();

var render256Palette = function(r,g,b) {
  var x = r*8+b*2, y = g*8+b;
  renderSwatch([y,x], [r,g,b], '#'+r+g+b, r+g+b >= 7);
};

var renderGrayPalette = function(yOffset, dec) {
  var intensity = (dec-232);
  var x=intensity*5, y=yOffset;
  renderSwatch([y,x], dec, dec+'d', intensity >= 12);
};

var renderSystemPalette = function(yOffset, dec) {
  var x=dec*5, y=yOffset;
  renderSwatch([y,x], dec, dec+'d', dec > 0);
};

var renderSwatch = function(coords, channels, label, isBlack) {
  tty.rgb(channels, 1);

  // swatch
  for (var _y=0; _y<2; _y++) {
    tty.moveTo([coords[0]+_y, coords[1]]).text('    ');
  }

  // label
  tty.moveTo(coords).rgb(isBlack ? 0 : [5,5,5]).text(label);
};

// all the colors!
for (var r=0; r<6; ++r) {
  for (var g=0; g<6; ++g) {
    for (var b=0; b<6; ++b) {
      render256Palette(r,g,b);
    }
  }
}

// all the grays
for (var k=232; k<256; k++) {
  renderGrayPalette(48, k);
}

// all the system colors
for (var k=0; k<16; k++) {
  renderSystemPalette(51, k);
}

tty.moveTo([53,0]).reset();
