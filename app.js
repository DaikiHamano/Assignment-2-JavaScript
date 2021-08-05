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
const Customer = require('./models/customer');
//to use session
passport.use(Customer.createStrategy());
passport.serializeUser(Customer.serializeUser());
passport.deserializeUser(Customer.deserializeUser());


//
//after the passport ones
//this must be used and placed
//to show the page
app.use('/', indexRouter);
app.use('/crud', crudRouter);
//
//
//


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
