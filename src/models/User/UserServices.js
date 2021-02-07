const mongoose = require("mongoose");
const { tokenForUser } = require("../../utils/tokenUtils.js");

const LoginUser = async (user) => {
  const token = await tokenForUser(user);
  const response = Object.assign({ token: token }, user._doc);
  return token ? response : Error("Token is not created..");
};

const SignUpNewUser = async (req) => {
  const User = mongoose.model("User");
  const { email, password, firstName, lastName } = req.body;
  // Checking email is in use made by schema validation ,so no need here.
  if (!email || !password || !firstName || !lastName)
    return Error("Body cant be Empty!");

  const user = {
    email: email,
    password: password,
    firstName: firstName,
    lastName: lastName,
  };
  const moduleInstance = new User(user);
  const savedInstance = await moduleInstance.save();
  user.token = await tokenForUser(user);

  // Respond to request indicating the user was created
  return user;
};
const findUserByEmail = (email) => {
  const User = mongoose.model("User");
  return User.findOne({ email }).exec();
};

module.exports = {
  LoginUser,
  SignUpNewUser,
  findUserByEmail,
};
