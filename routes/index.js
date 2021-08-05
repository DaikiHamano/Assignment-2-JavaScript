var express = require('express');
var router = express.Router();
const Customer = require('../models/customer');
const passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
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
Customer.register(

  new Customer({ username: req.body.username}),
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

module.exports = router;
