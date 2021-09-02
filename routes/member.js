const express = require('express');
const User = require('../models/memberSchema');
const passport = require('passport');
const { ensureAuthenticated } = require('../config/auth');
const router = express.Router();

// all member endpoints here

router.get('/',(req,res) => {
    res.send('this is Member Page');
});


router.get('/dashboard',ensureAuthenticated,(req,res) => {
    res.render('memberDashboard');
});

// New member registration
router.post('/register',(req,res) => {
    const {name,city,contact_no,email ,password} = req.body;
    User.findOne({email:email})
    .then(user => {
        if(user){
            console.log(user.email);
            res.send("User Exists");
        }
        else{
            const registration_date = new Date();
            const type = 'member';
            const newRecord = new User({
                name,
                city,
                contact_no,
                registration_date,
                email,
                password,
                type
            });
            newRecord.save();
            res.send("registration successfull");
        }
    })
});

// Login
router.post('/login', (req, res, next) => {
      passport.authenticate('member', {
      successRedirect: '/member/dashboard',
      failureRedirect: '/',
    })(req, res, next);
});

// Logout
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});


module.exports = router;