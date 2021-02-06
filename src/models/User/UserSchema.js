const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcryptjs");
const mongoosePaginate = require("mongoose-paginate");

// Define our model
const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    index: true,
    lowercase: true,
  },
  password: String,
  firstName: String,
  lastName: String,
});
//Implementing mongoose-paginate to Schema so when we need , we can paginate 
userSchema.plugin(mongoosePaginate);

// On Save Hook, encrypt password
userSchema.pre("save", async function (next) {
  // get access to the user model
  var user = this;
  const hashedPassword = await bcrypt.hash(user.password, 10);
  user.password = hashedPassword;
  next();
});
userSchema.methods.validatePassword = (password, hashedPassword, callback) => {
  bcrypt.compare(password, hashedPassword, (err, isMatch) => {
    if (err) return callback(err);
    callback(null, isMatch);
  });
};

// Create the user model
const UserModel = mongoose.model("User", userSchema);

// Export the model
module.exports = UserModel;
