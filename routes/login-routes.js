var express = require('express');
var router = express.Router();
const passport = require('passport');


router.post('/login', (req , res) =>{
  res.send('NOT IMPLEMENTED')
})

// auth logout
router.get('/logout', (req, res) =>{
  res.send('NOT IMPLEMENTED')
})

// auth with google+
router.get('/twitter',  passport.authenticate('twitter', {
  scope: ['profile']
  })
)


//callback route for google to redirect too
router.get('/twitter/redirect', passport.authenticate('twitter'), (req, res) => {
  res.redirect('/')
});

module.exports = router;



