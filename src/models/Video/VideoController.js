const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const {
  findAllVideos,
  createNewVideo,
  findVideoById,
} = require("./VideoServices");

const getAllVideos = async (ctx) => {
  try {
    const response = await findAllVideos(ctx);
    ctx.body = response;
  } catch (err) {
    console.log("Error here ...", err);
    ctx.body = { message: err.message };
  }
};
const creteNewVideo = async (ctx) => {
  try {
    const response = await createNewVideo(ctx);
    ctx.body = response;
  } catch (err) {
    console.log("Error here ...", err);
    ctx.body = { message: err.message };
  }
};
const findVideoWithId = async (ctx) => {
  try {
    const response = await findVideoById(ctx);
    ctx.body = response;
  } catch (err) {
    console.log("Error here ...", err);
    ctx.body = { message: err.message };
  }
};

module.exports = {
  getAllVideos,
  creteNewVideo,
  findVideoWithId,
};
