const express = require('express');
const User = require('../models/memberSchema');
const passport = require('passport');
const { isAuth } = require('../config/auth');
const bcrypt = require('bcrypt');
const Equipment = require('../models/equipmentSchema');
const Trainer = require('../models/trainerSchema');
const Report = require('../models/reportSchema');
const router = express.Router();

// all member endpoints here

router.get('/',(req,res) => {
    res.send('this is Member Page');
});


router.get('/dashboard',isAuth, async (req,res) => {
    let data = await User.findOne({_id:req.user.id});
    let equipments = await Equipment.find();
    let trainerDetails;
    if(req.user.trainer_id === "notSelected") trainerDetails = false;
    else {
        trainerDetails = await Trainer.findOne({_id:req.user.trainer_id});
    }
    res.render('memberDashboard',{
        'member':data,
        'equipments':equipments,
        'trainerDetails':trainerDetails
    });
});

// New member registration
router.post('/register',(req,res) => {
    const {name,city,contact_no,email,trainer_id} = req.body;
    var password = req.body.password;
    if(password.length < 6){
        req.flash('error','Password length should be greater than 5');
        return res.redirect('/');
    }

    User.findOne({email:email})
    .then(user => {
        if(user){
            req.flash('error','User already exists');
            res.redirect('/');
        }
        else{ 

            const saltRounds = 10;  // Higher the salt value, more time for hashing
            const registration_date = new Date();
            const type = 'member';

            // Password Hashing
            bcrypt.genSalt(saltRounds, (err, salt) => {
                bcrypt.hash(password, salt, (err, hash) => {
                     if(err) throw err;
                     else{

                        password = hash;
                        const newRecord = new User({
                            name,
                            city,
                            contact_no,
                            registration_date,
                            email,
                            password,
                            trainer_id,
                            type
                        });
                        newRecord.save();
                        
                        req.flash("success","Registration Successfull, Login with your Email and Password !!");
                        res.redirect("/");
                     }
                });
            });  
        
        }
    });
  
});

// Login handling
router.post('/login', (req, res, next) => {
      passport.authenticate('member', {
      successRedirect: '/member/dashboard',
      failureRedirect: '/',
      failureFlash:true,
    })(req, res, next);
});

// Logout 
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});


module.exports = router;