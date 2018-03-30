var express = require('express');
var router = express.Router();
const User = require('../models/user');
var mongoose = require('mongoose')
const Picture = require('../models/picture');

const passport = require('passport');


router.get('/', function(req, res){
 if(req.session.length>0){
    var user = req.session.passport.user;
  User.findById({_id: user}).exec((err, userData)=>{
    Picture.find({}).populate('owner').exec((err, picData)=>{
      res.render('index', {title: 'Other-Wordly', session: true, pics: picData, username: userData.username});
    })
  })
  } else{

     Picture.find({}).populate('owner').exec((err, picData)=>{
      res.render('index', {title: 'Other-Wordly', session: false, pics: picData});
    })
  }
  
})

router.get('/shareboard', function(req, res){
  if(req.session.length>0){
    var user = req.session.passport.user;
    
  User.findById({_id:user}).populate('pics').exec((err, userData)=>{
      if(userData.pics.length>0){
        var lastPic = userData.pics[userData.pics.length-1];
        pics = userData.pics;
      } else {
        pics = false;
        lastPic = false;
      }
      
      res.render('board', {title: 'Other-Wordly', subtitle: 'My Worlds', session: true, pics: pics, lastPic: lastPic, username: userData.username});
    })
    
  } else{
    res.render('index', {session: false})
  }
  
});

router.post('/pic', function(req, res){
  if(req.session.length>0){
    var user = req.session.passport.user;
    
    var picture = new Picture({
      src: req.body.src,
      owner: user,
      name: req.body.name
    });
    //
    picture.save((err, picData) =>{
      User.findByIdAndUpdate({_id: user}, {$push: {pics: picture._id}}, {new: true}).populate('pics').exec((err, userData)=>{
        console.log(userData);
        res.redirect('/shareboard')
      })
    })

  } else {
    res.render('index', {session: false});
  }
});

router.post('/delete', (req,res)=>{
  console.log('click')
  if(req.session.length>0){
    user = req.session.passport.user;
    Picture.findByIdAndRemove({_id: req.body._id}).then((err, obj)=>{
      User.findByIdAndUpdate({_id:user}, {$pull: {pics: req.body._id}}).then((err, obj)=>{
        res.redirect('/shareboard')
      })
    }); 
  } else {
    res.render('index', {session: false});
  }
});

router.get('/user/:userid', function(req, res){
  var userid = req.params.userid;
  console.log('USER ' + userid)
  User.findById({_id: userid}).populate('pics').exec((err, userData)=>{
    console.log(userData.pics[0])
    res.render('profile', {title: 'Other-Wordly', session: true, pics: userData.pics, username: userData.username});
  });

  
})

module.exports = router;


