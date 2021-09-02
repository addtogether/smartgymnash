const express = require('express');
const router = express.Router();


// all admin endpoints here

router.get('/',(req,res) => {
    res.send("This is admin Page");
});



module.exports = router;