var express = require('express');
var router = express.Router();
const passport = require('passport');


router.get('/', function(req, res){
  if(req.session){
    var user = req.session.passport.user;
    res.render('index', {title: 'Other-Wordly', session: true});
  } else{
    res.render('index', {session: false})
  }
  
})

router.get('/shareboard', function(req, res){
  if(req.session){
    var user = req.session.passport.user;
    res.render('board', {title: 'Other-Wordly', session: true});
  } else{
    res.render('index', {session: false})
  }
  
})


module.exports = router;



