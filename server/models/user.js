const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  name: String,
  email: String,
  password: String,
  family: Number,
  intolerance: [],
  shoppingHistory: [],
  vegan: Boolean,
  isCompleted: Boolean,
  admin: {
    type: Boolean,
    default: false,
  },
  weight: Number,
  height: Number,
  male: Boolean,
});

userSchema.plugin(passportLocalMongoose, { usernameField: "username" });

module.exports = mongoose.model("User", userSchema);
