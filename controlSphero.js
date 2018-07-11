var sphero = require("sphero");
var orb = sphero("e5676db2132f");
var keypress = require("keypress");

orb.connect(listen);
//orb.detectCollisions().then(orb.connect(listen));

orb.on("collision", function(data) {
	console.log("collision detected");
	console.log(" data:", data);
	
	orb.color("red").delay(100).then(function() {
		return orb.color("green");
	});
});

function handle(ch,key) {
	var stop = orb.roll.bind(orb,0,0),
	roll = orb.roll.bind(orb,180);
	
	if (key.ctrl && key.name == "c") {
	process.stdin.pause();
	process.exit();
	}
	
	if (key.name == "e") {	
		orb.startCalibration();
	}
	
	if (key.name == "q") {
		orb.finishCalibration();
	}
	
	if(key.name == "up") {	
		roll(0);
	}

	if (key.name == "down") {
		roll(180);
	}

	if (key.name == "left") {
		roll(270);
	}

	if (key.name == "right") {
		roll(90);
	}

	if (key.name == "space") {
		stop();
	}
}

function listen() {
	orb.detectCollisions();
	keypress(process.stdin);	
	process.stdin.on("keypress",handle);

	console.log("Start controlling the BB8...");

	process.stdin.setRawMode(true);
	process.stdin.resume();
}

