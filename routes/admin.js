const express = require('express');
const router = express.Router();


// all admin endpoints here

router.get('/',(req,res) => {
    res.send("This is admin Page");
});


router.post('/dashboard',(req,res) => {
    // fetching form data
    const {email,password} = req.body;
    //console.log(email,password);
    res.send('successful login ,Admin dashboard page here');
})


module.exports = router;