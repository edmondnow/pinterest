var express = require('express');
var router = express.Router();
const passport = require('passport');



// auth logout
router.get('/logout', (req, res) => {
    // handle with passport
    req.session = null;
    req.logout();//passport method
    res.redirect('/');
});

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



