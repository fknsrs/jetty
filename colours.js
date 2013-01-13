var Jetty = require('./index.js');
var tty = new Jetty(process.stdout);

var clamp = function(n, limit) {
  return n >= limit ? 0 : n;
};

var fg = 0;
var bg = 113;

for (var _i=0; _i<216; _i++) {
  fg = clamp(fg, 216);
  bg = clamp(bg, 216);
  tty.text(fg+16 + ' ').rgb(fg).rgb(bg,1).text("#" + (fg+16).toString(6)).reset().text("\n");
  fg += 1;
  bg += 1;
}

