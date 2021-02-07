const mongoose = require("mongoose"),
  Video = require("./src/models/Video/VideoSchema"),
  VideoType = require("./src/models/Video/VideoTypeSchema");
const formats = require("./ffmegTypes");
const videosArray = require("./SeedVideos");

let types = [];

Object.keys(formats).forEach((key) => {
  return types.push({ type: key, details: formats[key] });
});

let seedDB = () => {
  //REMOVE ALL//
  /* VideoType.deleteMany({}, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("removed models!");
    }

    /*=========================================================
   Add All media types to Database
    /*=========================================================*/
  /*
    types.length > 0
      ? types.forEach((seed) => {
          VideoType.create(seed, (err, type) => {
            if (err) {
              console.log(err);
            } else {
              console.log("Type  seed success");
            }
          });
        })
      : null;
  });*/

  /* Video.deleteMany({}, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("removed models!");
    }*/
  videosArray.forEach((seed) => {
    Video.create(seed, (err, type) => {
      if (err) {
        console.log("error at Video model seeding", err);
      } else {
        console.log("Video seed success");
      }
    });
  });
  // });
};

module.exports = seedDB;
