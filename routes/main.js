const express = require('express');
const router = express.Router();

// endpoints
router.get('/',(req,res) => {
    res.render('index');
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