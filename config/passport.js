const localStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = require('../models/memberSchema');
const Admin = require('../models/adminSchema');
const passport = require('passport');


// Strategy for member authentication
module.exports = function(passport){
    passport.use('member',
        new localStrategy({usernameField:'email'},(email,password,done) => {
            User.findOne({email:email,password:password})
            .then(user => {
                if(!user){
                    return done(null,false,{message:"Email or password error"}); 
                }
                else {
                    return done(null,user);
                }
            })
            .catch(err => console.log(err));

        })
    )

    passport.use('admin',
           new localStrategy({usernameField:'email'},(email,password,done) => {
           Admin.findOne({email:email,password:password})
           .then(admin => {
               if(!admin){
                   return done(null,false,{message:"Email Or Password error"});
               }
               else{
                   return done(null,admin);
               }
           })
           .catch(err => console.log(err));
    })
)
};


passport.serializeUser(function(user, done) {
     done(null,{id:user.id,type:user.type});
});
  
passport.deserializeUser(function(obj, done) {
        if(obj.type == 'member'){
            User.findById(obj.id, function(err, user) {
            done(err, user);
            });
        }
        else{
            Admin.findById(obj.id, function(err, admin) {
                done(err, admin);
            });
        }
});