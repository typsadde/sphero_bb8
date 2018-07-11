var mqtt = require('mqtt')
var client = mqtt.connect('mqtt://test.mosquitto.org')

var keypress = require("keypress")

var sphero = require("sphero");
var orb = sphero("e5676db2132f");

var opts = {
	n:200,
	m:1,
	mask1:0x00000000,
	pcnt:0,
	mask2:0x0D800000
	}

orb.connect(function() {
	console.log("BB8 is connected...")
	changeColor("green")
	console.log("Starting to stream odometer...")
	orb.setDataStreaming(opts)
	orb.streamGyroscope()
	keyListener()
	//orb.roll(150,60);	
	//orb.getColor(orbColor)
});

orb.on("gyroscope",function(data){
	var gyroJsonData = jsonifyBB8Gyro("xGyro",data.xGyro.value)
	//console.log(gyroJsonData)
	client.publish('presence',gyroJsonData)
})

orb.on("dataStreaming", function(data){
	
	var jsonPayload = jsonifyBB8Message(data.xOdometer.value,data.yOdometer.value,data.xVelocity.value,data.yVelocity.value)	
	//console.log(jsonPayload)
	//console.log(data)
	client.publish('presence',jsonPayload)
	
})

client.on('connect', function() {
	console.log("Mqtt connected");
	client.subscribe('presence')
});

client.on('message', function(topic, message) {
	console.log(message.toString())
})

function handle(ch,key) {
	var stop = orb.roll.bind(orb,0,0)
	roll = orb.roll.bind(orb,60)

	if (key.ctrl && key.name === "c") {
		process.stdin.pause()
		process.exit()
	}
	
	if (key.name === "up") {
		roll(0)
	}
	if (key.name === "down") {
		roll(180)
	}
	if (key.name === "left") {
		roll(270)
	}
	if (key.name === "right") {
		roll(90)
	}
	if (key.name === "space") {
		stop()	
	}
	if (key.name === "b") {
		changeColor("blue")
	}
	if (key.name === "r") {
		changeColor("red")
	}
	if (key.name === "m") {
		changeColor("magenta")
	}
}

function keyListener() {
	keypress(process.stdin)
	process.stdin.on("keypress",handle)
	
	console.log("Listening to keypresses")
	
	process.stdin.setRawMode(true)
	process.stdin.resume()
}

function jsonifyBB8Gyro(key,value) {
	var jsonToReturn = '{"'+key+'":"'+value+'"}'
	return jsonToReturn
}

function jsonifyColorMessage(color) {
	var jsonColor = '{"color":"'+color+'"}'
	return jsonColor
}

function 
jsonifyBB8Message(xOdometer,yOdometer,xVel,yVel) {
	var jsonString = 
'{"xOdometer":"'+xOdometer+'","yOdometer":"'+yOdometer+'","xVel":"'+xVel+'","yVel":"'+yVel+'"}'
	var jsonToReturn = JSON.parse(jsonString)
	console.log(jsonString)
	return jsonString
}

function changeColor(color) {
	orb.color(color, function(err,data) {
	console.log(err || "Color Changed!");
	orb.getColor(orbColor)
	});
}

function orbColor(err, data) {
	
		if(err) {
			console.log(err);
		}
		else {
			var jsonColorString = jsonifyColorMessage(data.color)
			client.publish('presence',jsonColorString)
		}
}
