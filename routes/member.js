const express = require('express');
const User = require('../models/memberSchema');
const passport = require('passport');
const { isAuth } = require('../config/auth');
const bcrypt = require('bcrypt');
const Equipment = require('../models/equipmentSchema');
const Trainer = require('../models/trainerSchema');
const Report = require('../models/reportSchema');
const sanitize  = require('mongo-sanitize');
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
    var {name,city,contact_no,email,trainer_id} = req.body;
    name = sanitize(name);
    city = sanitize(city);
    contact_no = sanitize(contact_no);
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
            const membership = new Date("2020-10-13T05:17:41.998+00:00");

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
                            membership,
                            type
                        });
                        newRecord.save();
                        if(trainer_id !== "notSelected"){
                            Trainer.findOneAndUpdate({_id:trainer_id},{
                                $inc:{
                                    members_cnt:1
                                }
                            });
                        }
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

router.post('/dashboard/reportTrainer',async (req,res) => {
    // const {user_id,reported_by,report,equipment_id} = req.body;
    const user_id = req.user._id;
    const reported_by = req.user.name;
    const equipment_id = req.body.trainer_id;
    const date = new Date();
    let data =  await Trainer.findOneAndUpdate({_id:equipment_id},{
        $inc:{
            reports:1
        }
    });
    let trainer = await Trainer.findOne({_id:equipment_id});
    let trainer_name = trainer.name;
    const newReport = Report({
        user_id:user_id,
        reported_for_id:equipment_id,
        reported_by:reported_by,
        reported_for:trainer_name,
        report_date:date,
        report_type:"Trainer"
    });
    
    try{
        req.flash("success","Trainer has been reported Successfully !!");
        newReport.save();
        
    }
    catch(error){
        console.log(error);
    }
    res.redirect('/member/dashboard');
});

//update member information
router.post('/updateinfo/:id', (req, res) => {
    let id=req.params.id;
    User.findByIdAndUpdate(id,{
        name: req.body.name,
        city: req.body.city,
        contact_no : req.body.contact,
    },(err,result)=>{
        req.flash("success","Details Updated Successfully !!");
        res.redirect('/member/dashboard')
    });

});

// router.post('/dashboard/renew',async (req,res) => {
//      let date =  new Date();
//      let data = await User.findOneAndUpdate({_id:req.user.id},{
//          $set:{
//              membership:date
//          }
//      });
//      res.redirect('/member/dashboard');
// });


module.exports = router;