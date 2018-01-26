var sphero = require("sphero");
var orb = sphero("e5676db2132f");

var SerialPort = require('serialport');
var port = new SerialPort('/dev/ttyMFD2',{ baudRate: 115200 });

orb.connect(function() {
  // options for streaming data
  var opts = {
    n: 200,
    m: 1,
    mask1: 0x00000000,
    pcnt: 0,
    mask2: 0x0D800000
  };

  orb.setDataStreaming(opts);

  orb.on("dataStreaming", function(data) {
    port.write(" x Odometer: " + data.xOdometer.value);
    port.write(" y Odometer: " + data.yOdometer.value);
    console.log("streaming data packet recieved");
    console.log("  data:", data.packet);
  });

  orb.roll(150, 60);
});
