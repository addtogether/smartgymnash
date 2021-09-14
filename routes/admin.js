const express = require('express');
const passport = require('passport');
const { isAuth } = require('../config/auth');
const Admin = require('../models/adminSchema');
const User = require('../models/memberSchema');
const Trainer = require('../models/trainerSchema');
const router = express.Router();

// all admin endpoints here

router.get('/',(req,res) => {
    res.send("This is admin Page");
});


router.get('/dashboard',isAuth,async (req,res) => {
    let adminEmail = await Admin.findOne({_id:req.user.id});
    let members = await User.find();
    let trainers = await Trainer.find();
    res.render('adminDashboard',{
        'adminEmail': adminEmail,
        'members': members,
        'trainers': trainers
    });
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