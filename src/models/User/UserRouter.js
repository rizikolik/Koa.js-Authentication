const Router = require("@koa/router");
const passport = require("passport");

const { Login, Signup } = require("./UserController");
//MiddleWare for Auth at every Route
const requireLogin = require("../../middleware/requireLogin");
//Adding api to every user route
const router = new Router({ prefix: "/api" });

router.get("/", async (ctx, next) => {
  await next();
  ctx.body = { message: "starting route for User model" };
});
router.post("/login", async (ctx) => {
  return passport.authenticate(
    "local.user",
    { username: "email" },
    async (err, user, info, status) => {
      if (user) {
        ctx.status = 200;
        ctx.body = await Login(user._doc);
      } else {
        ctx.status = 400;
        ctx.body = { status: "Not registered User" };
      }
    }
  )(ctx);
});
router.post("/signup", async (ctx, next) => {
  await next();
  return Signup(ctx);
});
router.get("/hello", async (ctx, next) => {
  await requireLogin(ctx, next),
    (ctx.body = { message: "You are authorized,And see the content of app" });
});
module.exports = router;
