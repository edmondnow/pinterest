var express = require('express');
var router = express.Router();
var controller = require('../controllers/login-controller.js');
const passport = require('passport');


router.post('/login', controller.login_post);

// auth logout
router.get('/logout', controller.logout_get);

// auth with google+
router.get('/twitter', controller.twitter_get);

//callback route for google to redirect too
router.get('/twitter/redirect', controller.twitter_redirect)


module.exports = router;



