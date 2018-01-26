var sphero = require("sphero"), bb8 = sphero("e5676db2132f");
var SerialPort = require('serialport');
var port = new SerialPort('/dev/ttyMFD2', { baudRate: 115200 });

bb8.connect(function () {

  console.log("::STARTING CALIBRATION::");
  bb8.color("blue")
  bb8.startCalibration();

  bb8.finishCalibration();
  console.log("::FINISH CALIBRATION::");
  bb8.color("green")

  bb8.streamVelocity();

  bb8.on("velocity", function (data) {
    port.write("Vx: " + data.xVelocity.value[0] + " ", function (err) {
      if (err) {
        return console.log('Error on write ', err.message);
      }
      console.log('x Velocity sent');
    });
    port.write("Vy: " + data.yVelocity.value[0], function (err) {
      if (err) {
        return console.log('Error on write ', err.message);
      }
      console.log('y Velocity sent');
    });
    /*
    console.log(" sensor:", data.xVelocity.sensor);
    console.log(" range:", data.xVelocity.range);
    console.log(" units:", data.xVelocity.units);
    console.log(" value:", data.xVelocity.value[0]);
  
    console.log(" sensor:", data.yVelocity.sensor);
    console.log(" range:", data.yVelocity.range);
    console.log(" units:", data.yVelocity.units);
    console.log(" value:", data.yVelocity.value[0]);
    */
  });
  bb8.roll(150, 0);
});
