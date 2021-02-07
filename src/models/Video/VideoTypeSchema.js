const mongoose = require("mongoose");
const ffmpeg = require("fluent-ffmpeg");
const { Schema } = mongoose;
const VideoTypeSchema = new Schema({
  type: String,
  details: {
    description: String,
    canDemux: Boolean,
    canMux: Boolean,
  },
});
const VideoTypeModel = mongoose.model("VideoType", VideoTypeSchema);

// Export the model
module.exports = VideoTypeModel;
