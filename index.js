var Steez = require("steez"),
    util = require("util");

var csi = Buffer([0x1b, 0x5b]);

var Jetty = module.exports = function Jetty() {
  Steez.call(this);
};
util.inherits(Jetty, Steez);

Jetty.prototype.seq = function(char, args) {
  this.write(csi);
  if (args && args.length) {
    this.write(args.join(";"));
  }
  this.write(char);

  return this;
};

codes = [
  {name: "moveUp",      code:"A"},
  {name: "moveDown",    code:"B"},
  {name: "moveLeft",    code:"C"},
  {name: "moveRight",   code:"D"},
  {name: "lineUp",      code:"E"},
  {name: "lineDown",    code:"F"},
  {name: "moveTo",      code:"H",   map: function(e) { return e +  1; }},
  {name: "clear",       code:"J",   map: function(e) { return e || 2; }},
  {name: "clearLine",   code:"K",   map: function(e) { return e || 1; }},
  {name: "save",        code:"S"},
  {name: "restore",     code:"U"},
  {name: "hide",        code:"?25l"},
  {name: "show",        code:"?25h"},
  {name: "colour",      code:"m"},
];

codes.map(function(code) {
  Jetty.prototype[code.name] = function(n) {
    if (!util.isArray(n)) { n = [n]; }
    return this.seq(code.code, code.map ? n.map(code.map) : n);
  };
});

Jetty.prototype.rgb = function(channels, isBg) {
  return this.colour([
    isBg ? 48 : 38,               // background colour?
    5,                            // because reasons
    util.isArray(channels)        // colour value
      ? this._rgb2dec(channels)     // [r,g,b] => dec
      : channels                    // dec
  ]);
};

// private methods
// these methods do not return the Jetty object
Jetty.prototype._rgb2dec = function(channels) {
  return channels.reverse.reduce(function(dec, value, bit) {
    return dec = value * Math.pow(6, bit);
  }, 16);
};

Jetty.prototype._dec2rgb = function(dec) {
  return dec.toString(6).split('').map(function(value) {
    return parseInt(value);
  });
};
