const express = require('express');
const passport = require('passport');
const { ensureAuthenticated } = require('../config/auth');
const router = express.Router();

// all admin endpoints here

router.get('/',(req,res) => {
    res.send("This is admin Page");
});


router.get('/dashboard',ensureAuthenticated,(req,res) => {
    res.render('adminDashboard',{'admin':req.user.email});
});

// Login
router.post('/login', (req, res, next) => {
    passport.authenticate('admin', {
    successRedirect: '/admin/dashboard',
    failureRedirect: '/',
    failureFlash:true
  })(req, res, next);
});

// logout
router.get('/logout',(req,res,next) => {
    req.logout();
    res.redirect('/');
});


module.exports = router;