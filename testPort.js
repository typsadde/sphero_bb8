var SerialPort = require('serialport');
var port = new SerialPort('/dev/ttyMFD2', {baudRate: 115200});

port.write('main screen turn on', function(err) {
  if (err) {
    return console.log('Error on write: ', err.message);
  }
  console.log('message written');
});

port.on('error', function(err) {
  console.log('Error: ', err.message);
})
