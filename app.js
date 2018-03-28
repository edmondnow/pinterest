var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieSession = require('cookie-session');
var bodyParser = require('body-parser');
var keys = require('./config/keys');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.Promise = global.Promise;
var session = require('express-session');
var login_routes = require('./routes/login-routes');
var main_routes = require('./routes/main-routes');
var passport = require('passport')
const passportSetup = require('./config/passport-settings');

var app = express();


//connect to db
mongoose.connect(keys.mlab);

mongoose.connection.once('open', function(){
  console.log("Connection made. Now for fireworks... ");
}).on("error", function(error){
  console.log("Connection error: " + error);
});

//use sessions for tracking logins
app.use(cookieSession({
  name: 'session',
  maxAge: 24*60*60*1000,
  keys: [keys.cookie]
}));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());


app.use('/auth', login_routes);
app.use('/', main_routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
