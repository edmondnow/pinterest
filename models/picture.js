const mongoose = require('mongoose')
const Schema = mongoose.Schema

var PictureSchema = new Schema({
  src: {type: String, required: true},
  owner: {type: Schema.ObjectId, ref: 'picture', required: true}
});

var Picture = mongoose.model('picture', PictureSchema);

module.exports = Picture;
