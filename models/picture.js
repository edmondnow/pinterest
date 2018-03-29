const mongoose = require('mongoose')
const Schema = mongoose.Schema

var PictureSchema = new Schema({
  src: {type: String, required: true},
  owner: {type: Schema.ObjectId, ref: 'User', required: true},
  name: String
});

var Picture = mongoose.model('Picture', PictureSchema);

module.exports = Picture;
