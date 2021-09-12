const express = require('express');
const passport = require('passport');
const { isAuth } = require('../config/auth');
const router = express.Router();

// all admin endpoints here

router.get('/',(req,res) => {
    res.send("This is admin Page");
});


router.get('/dashboard',isAuth,(req,res) => {
    res.render('adminDashboard',{'admin':req.user.name});
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

router.get('/dashboard/stats',isAuth,(req,res) =>{
    res.render('chart');
})


module.exports = router;