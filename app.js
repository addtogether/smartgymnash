// required imports
const express = require('express');
const path = require('path');
const mainRouter = require('./routes/main');
const memberRouter = require('./routes/member');
const adminRouter = require('./routes/admin');

const port = 3000;
const app = express();


// setting view engine
app.set('view engine','ejs');

// Setting ejs views path
app.set('views',path.join(__dirname,'/views'));

// Setting static files path 
app.use(express.static(path.join(__dirname,'/public')));


// Routing
app.use('/',mainRouter);
app.use('/member',memberRouter);
app.use('/admin',adminRouter);


// testing purpose
app.listen(port,(req,res) => {
    console.log(`Listening on port ${port}`);
});

