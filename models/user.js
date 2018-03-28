const mongoose = require('mongoose')
const Schema = mongoose.Schema

var UserSchema = new Schema({
  username: {type: String, required: true, min: 6, max: 22},
  twitterId: {type: String, required: true},
  displayName: String,
  photo: String
});

var User = mongoose.model('user', UserSchema);

module.exports = User;
