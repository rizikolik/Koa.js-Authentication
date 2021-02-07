const jwt = require("jsonwebtoken");
const config = require("../../config");

const tokenForUser = (user) => {
  const timestamp = new Date().getTime();

  return jwt.sign(
    { user: user._id, iat: timestamp },
    config.selectedENV.jwtSecret
  );
};
const getTokenFromRequest = (request) => {
  const header = request.header.authorization;

  if (header) {
    const token = header.split(" ")[1];
    return token;
  }
  return null;
};
const verifyToken = (token) => {
  // valid token returns a decoded object
  try {
    const verifiedPayload = jwt.verify(token, config.selectedENV.jwtSecret);
    //Here time check will be added for token refresh process

    return verifiedPayload;
  } catch (error) {
    console.log(error, "errrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr");
    return null;
  }
};
module.exports = {
  tokenForUser,
  getTokenFromRequest,
  verifyToken,
};
