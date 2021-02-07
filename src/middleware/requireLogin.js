const { getTokenFromRequest, verifyToken } = require("../utils/tokenUtils");

module.exports = async (ctx, next) => {
  if (!isLoggedIn(ctx.request)) {
    ctx.status = 404;
    ctx.body = {
      message:
        "Check Your Token or Go to Login or Signup for Getting a Valid Token",
    };
    return ctx;
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
