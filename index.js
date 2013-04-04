var stream  = require("stream"),
    util    = require("util");

var csi = Buffer([0x1b, 0x5b]);

var Jetty = module.exports = function Jetty(outputStream) {
  stream.Readable.call(this);

  // pipe if stream is provided
  if (outputStream) {
    this.pipe(outputStream);
  }
};
util.inherits(Jetty, stream.Readable);

Jetty.prototype._read = function _read(n) {};

Jetty.prototype.seq = function(char, args) {
  this.push(csi);
  if (args && args.length) {
    this.push(args.join(";"));
  }
  this.push(char);

  return this;
};

Jetty.prototype.text = function(str, styleFn) {
  styleFn ? styleFn.call(this, str) : this.push(str);
  return this;
};

Jetty.prototype.erase = function(n, styleFn) {
  return this.text(new Array(n+1).join(' '), styleFn);
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
  {name: "sgr",         code:"m"},
];

codes.map(function(code) {
  Jetty.prototype[code.name] = function(n) {
    if (!util.isArray(n)) { n = [n]; }
    return this.seq(code.code, code.map ? n.map(code.map) : n);
  };
});

var sgrCodes = [
  {name: "reset",                   code: 0 },
  {name: "bold",                    code: 1 },
  {name: "faint",                   code: 2 },
  {name: "italic",                  code: 3 },
  {name: "underline",               code: 4 },
  {name: "blink",                   code: 5 },
  {name: "blinkRapid",              code: 6 },
  {name: "imageNegative",           code: 7 },
  {name: "conceal",                 code: 8 },
  {name: "strikeout",               code: 9 },
  {name: "font",                    code: function(n) { return [10 + (Number(n)||0)];   }},
  {name: "boldOff",                 code: 21},
  {name: "normal",                  code: 22},
  {name: "italicOff",               code: 23},
  {name: "underlineOff",            code: 24},
  {name: "blinkOff",                code: 25},
  {name: "imagePositive",           code: 27},
  {name: "reveal",                  code: 28},
  {name: "strikeoutOff",            code: 29},
  {name: "legacyColour",            code: function(n)   { return [30 + (Number(n)||0)]; }},
  {name: "colour",                  code: function(dec) { return [38, 5, dec];          }},
  {name: "defaultColour",           code: 39},
  {name: "legacyBackgroundColour",  code: function(n)   { return [40 + (Number(n)||0)]; }},
  {name: "backgroundColour",        code: function(dec) { return [48, 5, dec];          }},
  {name: "defaultBackgroundColour", code: 49},
  {name: "frame",                   code: 51},
  {name: "encircle",                code: 52},
  {name: "overline",                code: 53},
  {name: "frameOff",                code: 54},
  {name: "overlineOff",             code: 55}
];

sgrCodes.map(function(code) {
  Jetty.prototype[code.name] = function(n) {
    return this.sgr(
      typeof code.code === 'function'
        ? code.code(n)
        : [code.code]
    );
  }
});

Jetty.prototype.rgb = function(channels, isBg) {
  return this[isBg ? 'backgroundColour' : 'colour'](
    util.isArray(channels)        // colour value
      ? this._rgb2dec(channels)     // [r,g,b] => dec
      : channels                    // dec
  );
};

Jetty.prototype.nuke = function nuke() {
  return this.hide().clear().moveTo([0,0]);
};

// private methods
// these methods do not return the Jetty object
Jetty.prototype._rgb2dec = function(channels) {
  return channels.reverse().reduce(function(dec, value, bit) {
    return dec + value * Math.pow(6, bit);
  }, 16);
};

Jetty.prototype._dec2rgb = function(dec) {
  return ("000" + dec.toString(6)).substr(-3, 3).split('').map(function(value) {
    return parseInt(value);
  });
};
