const mongoose = require('mongoose');

// Admin schema
const schema = new  mongoose.Schema( {
    email:{
          type:String,
          required:true
    },
    password:{
        type:String,
        required:true
   },
   type:{
        type:String,
        required:true
   }

});


const Admin = mongoose.model('admins',schema);

module.exports = Admin;