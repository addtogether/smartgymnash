// required imports
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');
const mainRouter = require('./routes/main');
const memberRouter = require('./routes/member');
const adminRouter = require('./routes/admin');

require('./config/passport')(passport);

const port = 3000;
const app = express();


// setting view engine
app.set('view engine','ejs');

// Setting ejs views path
app.set('views',path.join(__dirname,'/views'));

// Setting static files path 
app.use(express.static('public'));

// Connect to database
const conn_string = 'mongodb+srv://rahul:rahul@cluster0.rb9pz.mongodb.net/smartGymnash?retryWrites=true&w=majority';

mongoose.connect(conn_string, { useNewUrlParser:true, useUnifiedTopology:true})
    .then( () => console.log("Connected to Atlas Database Successfully"))
    .catch( (err) => console.log("Error : ",err));


// Body parser middleware
app.use(express.urlencoded({
    extended:false
}));

// Express session middleware
app.use(session({
    secret:'secret',
    resave:true,
    saveUninitialized:true
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Use Connect flash
app.use(flash());

// Global variables - Store success and error messages 
app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});

// Routing
app.use('/',mainRouter);
app.use('/member',memberRouter);
app.use('/admin',adminRouter);



// testing purpose
app.listen(port,(req,res) => {
    console.log(`Listening on port ${port}`);
});

