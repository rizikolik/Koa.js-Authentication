const mongoose = require("mongoose");
const { Schema } = mongoose;
const mongoosePaginate = require("mongoose-paginate");
const VideoMetaDataSchema = require("./VideoMetaDataSchema");
// Define our model
const videoSchema = new Schema({
  title: String,
  author: { type: Schema.Types.ObjectId, ref: "User" },
  date: String,
  duration: String,
  source: String,
  extension: { type: Schema.Types.ObjectId, ref: "VideoType" },
  ratio: String,
  details: VideoMetaDataSchema,
});
//Implementing mongoose-paginate to Schema so when we need , we can paginate
videoSchema.plugin(mongoosePaginate);

// Create the video model

const VideoModel = mongoose.model("Video", videoSchema);

// Export the model
module.exports = VideoModel;
