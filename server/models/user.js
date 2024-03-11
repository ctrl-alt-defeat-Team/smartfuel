const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  name: String,
  email: String,
  password: String,
  family: Number,
  intolerance:[],
  shoppingHistory: [],
  vegan: Boolean,
  isCompleted: Boolean,
});

userSchema.plugin(passportLocalMongoose, { usernameField: 'username' });

module.exports = mongoose.model('User', userSchema);