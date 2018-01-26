var sphero = require("sphero"), bb8 = sphero("e5676db2132f");

bb8.connect(function() {
 console.log("::START CALIBRATION::");
  bb8.startCalibration();
  setTimeout(function() {
   console.log("::FINISH CALIBRATION::");
   bb8.finishCalibration();
  },5000);
});
