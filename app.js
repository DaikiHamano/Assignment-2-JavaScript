var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//to use the router
var indexRouter = require('./routes/index');
var crudRouter = require('./routes/crud');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



//for using database
const mongoose = require('mongoose');
//need to use the database
const connectionString = "mongodb+srv://admin:4Fourgelt@cluster0.03htj.mongodb.net/test"
mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
.then((message) => {
  console.log('Connected successfully!');
})
.catch((error) => {
  console.log(`Error while connecting! ${reason}`);
});



const session = require('express-session');
// Import passport modules
const passport = require('passport');
//for cookie
app.use(session({
  secret: 'a2021projectTracker',
  resave: false,
  saveUninitialized: false
}));
//init passport
app.use(passport.initialize());
//for session
app.use(passport.session());
//link
const User = require('./models/user');
//to use session
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//
//after the passport ones
//this must be used and placed
//to show the page
app.use('/', indexRouter);
app.use('/crud', crudRouter);
//
//
//



//have to use git ignore
//for github
const githubStrategy = require('passport-github2').Strategy;
// Import globals file
const config = require('./config/globals');
passport.use(new githubStrategy({
  clientID: config.github.clientId,
  clientSecret: config.github.clientSecret,
  callbackURL: config.github.callbackUrl
},
  // create async callback function
  async (accessToken, refreshToken, profile, done) => {
    // search user by ID
    const user = await User.findOne({ oauthId: profile.id });
    // user exists (returning user)
    if (user) {
      // done
      return done(null, user);
    }
    else {
      // new user so register them in the db
      const newUser = new User({
        username: profile.username,
        oauthId: profile.id,
        oauthProvider: 'Github',
        created: Date.now()
      });
      //for DB
      const savedUser = await newUser.save();
      return done(null, savedUser);
    }
  }
));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
