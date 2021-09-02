const express = require('express');
const router = express.Router();

// all user endpoints here

router.get('/',(req,res) => {
    res.send('this is Member Page');
});

module.exports = router;