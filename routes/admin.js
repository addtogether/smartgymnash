const express = require('express');
const passport = require('passport');
const { isAuth } = require('../config/auth');
const Admin = require('../models/adminSchema');
const Equipment = require('../models/equipmentSchema');
const User = require('../models/memberSchema');
const Trainer = require('../models/trainerSchema');
const Report = require('../models/reportSchema');
const router = express.Router();

// all admin endpoints here

router.get('/',(req,res) => {
    res.send("This is admin Page");
});


router.get('/dashboard',isAuth,async (req,res) => {
    let adminEmail = await Admin.findOne({_id:req.user.id});
    let members = await User.find().sort({registration_date:-1});
    let trainers = await Trainer.find();
    let equipments = await Equipment.find();
    let reports = await Report.find();
    let not_working = 0;
    let total_complaints = reports.length;
    for(var i = 0;i < equipments.length;i++){
        if(equipments[i].reports > 5) not_working += 1;
    }
  
    let working_equipments = equipments.length - not_working;
    res.render('adminDashboard',{
        'adminEmail': adminEmail,
        'members': members,
        'trainers': trainers,
        'equipments':equipments,
        'working_equipments':working_equipments,
        'total_complaints':total_complaints,
        'reports':reports
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
});

router.post('/dashboard/FixEquipment',async (req,res) => {
     
     const {equipment_id} = req.body;
     let eUpadte = await Equipment.findOneAndUpdate({_id:equipment_id},{
         $set:{
             reports:0
         }
     });
     let rUpdate = await EquipmentReport.deleteMany({equipment_id:equipment_id});
     res.redirect('/admin/dashboard');
});


module.exports = router;