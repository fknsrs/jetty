var Jetty = require('./index.js');
var tty = new Jetty(process.stdout);
tty.reset().clear();

var renderSwatch = function(r,g,b) {
  
  // pos
  var x = r*8+b*2;
  var y = g*8+b;
  
  // swatch
  for (var _x=0; _x<4; _x++) {
    for (var _y=0; _y<2; _y++) {
      tty.moveTo([y+_y, x+_x]).rgb([r,g,b],1).text(' ');
    }
  }

  // label
  tty.moveTo([y,x]).text('#'+r+g+b);
}

// all the colors!
for (var r=0; r<6; ++r) {
  for (var g=0; g<6; ++g) {
    for (var b=0; b<6; ++b) {
      renderSwatch(r,g,b);
    }
  }
}
