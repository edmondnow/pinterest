const passport = require('passport');
const TwitterStrategy = require('passport-twitter').Strategy;
//const keys = require('../config/keys');
const User = require('../models/user');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    });
});

passport.use(new TwitterStrategy({
    consumerKey: process.env.KEY,
    consumerSecret: process.env.SECRET,
    callbackURL: "/auth/twitter/redirect"
  },
  function(accessToken, refreshToken, profile, cb, done) {
        // check if user already exists in our own db
        User.findOne({twitterId: profile.user_id}).then((currentUser) => {
            if(currentUser){
                // already have this user
                console.log('user is: ', currentUser);
                done(null, currentUser);
            } else {
                // if not, create user in our db
                console.log(profile)
                new User({
                    twitterId: profile.user_id,
                    username: profile.screen_name
                }).save().then((newUser) => {
                    console.log('created new user: ', newUser);
                    done(null, newUser);
                });
            }
        });
    })
)