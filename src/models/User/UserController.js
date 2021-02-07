const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { LoginUser, SignUpNewUser, findUserByEmail } = require("./UserServices");

passport.use(
  "local.user",

  new LocalStrategy(async (email, password, done) => {
    try {
      const user = await findUserByEmail(email);
      if (user) {
        user.validatePassword(password, user.password, (err, isMatch) => {
          if (err) return done(err);
          if (isMatch) {
            delete user.password;
            return done(null, user);
          } else return done(null, false);
        });
      } else {
        return done(null, false);
      }
    } catch (e) {
      return done(e);
    }
  })
);
const Login = async (user) => {
  try {
    const response = await LoginUser(user);
    return response;
  } catch (err) {
    console.log(err, "here second error");
    return { message: err.message };
  }
};

const Signup = async (ctx) => {
  try {
    const response = await SignUpNewUser(ctx.request);

    ctx.body = response;
  } catch (err) {
    console.log("Error here ...", err);
    ctx.body = { message: err.message };
  }
};

module.exports = {
  Login,
  Signup,
};
