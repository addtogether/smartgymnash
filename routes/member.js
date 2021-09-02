const express = require('express');
const router = express.Router();

// all user endpoints here

router.get('/',(req,res) => {
    res.send('this is Member Page');
});


router.post('/dashboard',(req,res) => {
    // fetching form data
    // const {email,password} = req.body;
    // console.log(email,password);
    res.send('successful login ,Member dashboard page here');
})


module.exports = router;