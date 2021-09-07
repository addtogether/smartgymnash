const express = require('express');
const Trainer = require('../models/trainerSchema');
const router = express.Router();

// endpoints
router.get('/',async (req,res) => {
    const trainers = await Trainer.find();
    res.render('index',{
        'trainers':trainers
    });
});

router.get('/about',(req,res) => {
    res.render('about-us');
});

router.get('/bmi-calculator',(req,res) => {
    res.render('bmi-calculator');
});

router.get('/contact',(req,res) => {
    res.render('contact');
});

module.exports = router;