var Picture = require('../models/picture');
var User = require('../models/user');

module.exports.index_get = (req, res) => {
  res.render('index', {title: 'Other-Wordly'});
}

module.exports.picture_get = (req, res) =>{
  res.send('NOT IMPLEMENTED YET');YET
}


module.exports.picture_post = (req, res) =>{
  res.send("NOT IMPLEMENTED YET")
}

