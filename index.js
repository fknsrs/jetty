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
  {name: "show",        code:"?25h"}
];

codes.map(function(code) {
  Jetty.prototype[code.name] = function(n) {
    if (!util.isArray(n)) { n = [n]; }
    return this.seq(code.code, code.map ? n.map(code.map) : n);
  };
});
