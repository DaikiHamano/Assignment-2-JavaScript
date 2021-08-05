var express = require('express');
var router = express.Router();
const User= require('../models/user');
const passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', user: req.user });
});

router.get('/login', function(req, res, next) {
  //get the message from session
  let messages = req.session.messages || [];
  //clear 
  req.session.messages = [];
  //render the view and the pass the masseage
  res.render('login', {title: 'login', messages: messages });
  //res.render('login', {title: 'login'});
});

router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Register' });
});

router.post('/login', passport.authenticate('local',{
  successRedirect: '/crud',
  failureRedirect: '/login',
  failureMessage: 'invalid Credentials'
}));

router.post('/register', function(req, res, next) {
User.register(

  new User({ username: req.body.username}),
  req.body.password,
  (err, newUser) =>{
    if(err){
      console.log(err);
      return res.redirect('/register');
    }
  else{
    req.login(newUser,(err) => {
      res.redirect('/crud');
    })
  }
});
});

router.get('/logout', function(req, res, next){
req.logout();
res.redirect('/login');

});

// GET handler for /github
// call passport authenticate and pass the name of the stragety 
// and the information we require from github
router.get('/github', passport.authenticate('github', 
  { scope: ['user.email'] }));

// GET handler for /github/callback 
// this is the url they come back to after entering their credentials
router.get('/github/callback',
  // callback to send user back to login if unsuccessful
  passport.authenticate('github', { failureRedirect: '/login' }),
  // callback when login is successful
  (req, res, next) => { res.redirect('/projects') }
);

module.exports = router;
