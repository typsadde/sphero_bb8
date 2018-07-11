var sphero = require("sphero");
var orb = sphero("e5676db2132f");
var awsIot = require("aws-iot-device-sdk");

var device = awsIot.device({
	keyPath: "",	
	certPath: "",	
	caPath: "",
	clientId: "",
	host: ""
});

var orbColor = "";

device.on('connect', function() {
	orb.connect(function() {
		org.getColor(function(err,data) {
			if(err) {
				console.log(err);
				} else {
					orbColor = data.color;
					}
				});
			});
	console.log('connect');
	device.publish('topic_name', JSON.stringify({color:orbColor}));
});
