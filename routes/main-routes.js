var express = require('express');
var router = express.Router();
const User = require('../models/user');
var mongoose = require('mongoose')
const Picture = require('../models/picture');

const passport = require('passport');


router.get('/', function(req, res){
  console.log(req.session.length)
  if(req.session.length>0){
    var user = req.session.passport.user;
    
    res.render('index', {title: 'Other-Wordly', session: true});
  } else{
    res.render('index', {title: 'Other-Wordly', session: false})
  }
  
})

router.get('/shareboard', function(req, res){
  if(req.session){
    var user = req.session.passport.user;
    
  User.findById({_id:user}).populate('pics').exec((err, userData)=>{
      console.log(userData);
      res.render('board', {title: 'Other-Wordly', subtitle: 'Shareboard', session: true, pics: userData.pics});
    })
    
  } else{
    res.render('index', {session: false})
  }
  
});

router.post('/pic', function(req, res){
  if(req.session){
    var user = req.session.passport.user;
    
    var picture = new Picture({
      src: req.body.src,
      owner: user,
      description: req.body.description
    });
    //
    picture.save((err, picData) =>{
      console.log(user);
      User.findByIdAndUpdate({_id: user}, {$push: {pics: picture._id}}, {new: true}).populate('pics').exec((err, userData)=>{
        console.log(userData);
        res.render('board', {title: 'Other-Wordly', subtitle: 'Shareboard', session: true, pics: userData.pics});
      })
    })

  } else {
    res.render('index', {session: false});
  }
});


module.exports = router;



