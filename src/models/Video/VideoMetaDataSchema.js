const mongoose = require("mongoose");
const { Schema } = mongoose;
const VideoMetaDataSchema = new Schema({
  streams: [],
  format: {
    filename: String,

    format_name: String,
    duration: Number,
    size: Number,
  },
  chapters: [],
});

// Export the model
module.exports = VideoMetaDataSchema;
