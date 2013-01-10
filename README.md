Jetty
=====

TTY, you so fly.

Overview
--------

Jetty gives you a nice interface to working with ANSI control sequences. If you
need a full-blown terminal UI toolkit, you probably want something like curses.

Installation
------------

Available via [npm](http://npmjs.org/):

> $ npm install jetty

Or via git:

> $ git clone git://github.com/fknsrs/jetty.git  
> $ cd jetty  
> $ npm install  

Usage
-----

```
// Yeah, Jetty!
var Jetty = require("jetty");

// Create a new Jetty object. This is a through stream with some additional
// methods on it.
var jetty = new Jetty();

// Connect the jetty object to stdout so your pretty control sequences go
// somewhere!
jetty.pipe(process.stdout);

// Clear the screen
jetty.clear();

// Draw a circle!
var i = 0;
setInterval(function() {
  i += 0.025;

  var x = Math.round(Math.cos(i) * 25 + 50),
      y = Math.round(Math.sin(i) * 10 + 20);

  // Yep, all the Jetty methods that can be are chainable. `write` is not. It's
  // also not a Jetty method, but rather inherited from [Steez](https://github.com/deoxxa/steez).
  jetty.moveTo([y, x]).write(".");
}, 5);
```

License
-------

3-clause BSD. A copy is included with the source.

Contact
-------

* GitHub ([deoxxa](http://github.com/deoxxa))
* Twitter ([@deoxxa](http://twitter.com/deoxxa))
* ADN ([@deoxxa](https://alpha.app.net/deoxxa))
* Email ([deoxxa@fknsrs.biz](mailto:deoxxa@fknsrs.biz))
