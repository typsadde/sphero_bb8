var sphero = require("sphero"), bb8 = sphero("e5676db2132f");

bb8.connect(function() {
 setInterval(function() {
  var direction = Math.floor(Math.random() * 360);
  bb8.roll(150, direction);
 },1000);
});
