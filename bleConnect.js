var sphero = require("sphero"), bb8 = sphero("e5676db2132f");

bb8.connect(function () {

  bb8.roll(180, 0);
  console.log("hello from BB8");
  bb8.color("green");

  bb8.detectCollisions();

  bb8.on("collision", function(data)
  {
     console.log("collision detected");
     console.log("data:", data);

     bb8.color("green");

     setTimeout(function() {
       bb8.color("red");
     }, 100);
  });
});
