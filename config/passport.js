const localStrategy = require('passport-local').Strategy;
const User = require('../models/memberSchema');
const Admin = require('../models/adminSchema');
const bcrypt = require('bcrypt');
const passport = require('passport');



module.exports = function(passport){
    // Strategy for member authentication
    passport.use('member',
        new localStrategy({usernameField:'email'},(email,password,done) => {
            User.findOne({email:email})
            .then(user => {
                if(!user){
                    return done(null,false,{message:"User with this email does not exist"}); 
                }
                else {
                    // Password Matching
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if (err) throw err;
                        if (isMatch) {
                            return done(null, user);
                        } 
                        else {
                            return done(null, false, {message:'Wrong Password'});
                        }
                    });
                }
            })
            .catch(err => console.log(err));

        })
    )
    // Strategy for admin authentication
    passport.use('admin',
           new localStrategy({usernameField:'email'},(email,password,done) => {
           Admin.findOne({email:email})
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


// Serialize user adds authenticated user in session
passport.serializeUser(function(user, done) {
     done(null,{id:user.id,type:user.type});
});
  
// Deserialize user gets the user from the session 
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