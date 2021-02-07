const { getTokenFromRequest, verifyToken } = require("../utils/tokenUtils");

module.exports = async (ctx, next) => {
  if (!isLoggedIn(ctx.request)) {
    throw new Error(
      "You must login or provide a valid token for the current request!"
    );
  }

  await next();
};

function isLoggedIn(req) {
  return validJWTToken(req);
}

function validJWTToken(req) {
  const token = getTokenFromRequest(req);
  if (!token) {
    return false;
  }
  const decoded = verifyToken(token);
  return decoded.user;
}
