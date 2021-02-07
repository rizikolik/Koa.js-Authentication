const mongoose = require("mongoose");
const  ffmpeg = require('fluent-ffmpeg');
const { Schema } = mongoose;
const VideoTypeSchema = new Schema({
 type:String,   
 details:{
    description: String,
    canDemux: Boolean,
     canMux: Boolean
 }
 
  

});
const VideoTypeModel = mongoose.model("VideoType", VideoTypeSchema);

// Export the model
module.exports = VideoTypeModel;
/*ffmpeg.getAvailableFormats(function(err, formats) {
  console.log('Available formats:');
  console.log(Object.keys(formats).filter((key)=>key==="mpegts")[0])
});
  
  */