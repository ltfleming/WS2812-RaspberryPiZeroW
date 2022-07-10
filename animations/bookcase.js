/*******************************
	bookcase animations
*******************************/
var common = require("./common.js");

function bookcase() {
  var name = "bookcase.js";
  var speed = 20;
  var tickNumber = 0;

  getPatternByIndex = function (index) {
    var centers = [10, 31, 52];
    if (index == 0) centers;

    return [
      centers[0] - index,
      centers[0] + index,
      centers[1] - index,
      centers[1] + index,
      centers[2] - index,
      centers[2] + index,
    ];
  };

  this.TurnOn = function (args, strip) {
    strip.Mode = name + "bookcase";
    console.log("Turning bookcase on");
    this.TurnOnTick(args, strip);
  };

  this.TurnOnTick = function (args, strip) {
    var _this = this;

    for (var i = 0; i < strip.NUM_LEDS; i++) {
      strip.Lights[i] = rgb2Int(0, 0, 0);
    }

    if (tickNumber > 10) {
      tickNumber = 0;
    }

    var currentPattern = getPatternByIndex(tickNumber);
    // console.log("Tick: ", tickNumber);
    // console.log("Pattern: ", currentPattern);

    currentPattern.forEach((ledIndex) => {
      strip.Lights[ledIndex] = rgb2Int(128, 128, 128);
    });

    tickNumber = tickNumber + 1;

    strip.Render();

    setTimeout(function () {
      if (strip.Mode == name + "bookcase") {
        _this.TurnOnTick(args, strip);
      }
    }, speed);
  };

  rgb2Int = function (r, g, b) {
    return ((r & 0xff) << 16) + ((g & 0xff) << 8) + (b & 0xff);
  };
}

module.exports = new bookcase();
