const mongoose = require("mongoose");
const ffmpeg = require("fluent-ffmpeg");

const findAllVideos = (req) => {
  const Video = mongoose.model("Video");

  let options = {
    limit: 5,
  };
  let queryParams = {};
  if (req.query.ratio) {
    queryParams["ratio"] = { $eq: req.query.ratio };
  }
  return Video.paginate(queryParams, options);
};
const createNewVideo = async (req) => {
  const Video = mongoose.model("Video");
  const author = req.user;
  const { title, source } = req.body;
  // Checking email is in use made by schema validation ,so no need here.
  if (!title || !source || !author) return Error("Body cant be Empty!");

  const video = {
    title: title,
    source: source,
    authhor: author,
  };
  let extension;

  const metadata = await metaDataGetter(video.source);
  video.duration = metadata.format.duration;
  video.ratio = metadata.streams.filter(
    (stream) => stream.display_aspect_ratio
  )[0];
  video.date = metadata.format.date ? metadata.format.date : "";
  video.details = metadata;

  extension = metadata.format.tags
    ? metadata.format.tags.major_brand
      ? metadata.format.tags.major_brand.split("").slice(0, 3).join("")
      : metadata.format_name
    : metadata.format_name;
  const Type = mongoose.model("VideoType");
  const findType = Type.findOne({ type: extension });
  if (!findType) {
    throw Error("Video Type couldnt find");
  }
  video.extension = findType._id;

  const moduleInstance = new Video(video);
  const savedInstance = await moduleInstance.save();
  // Respond to request indicating the video was created
  return savedInstance;
};

const findVideoById = async (id) => {
  const Video = mongoose.model("Video");
  let response = await Video.findById(id).populate([
    { path: "author", select: "-password" }, //Hide Password
    "extension",
  ]);

  return response;
};

module.exports = {
  findAllVideos,
  createNewVideo,
  findVideoById,
};
