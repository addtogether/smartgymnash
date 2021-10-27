const mongoose = require('mongoose');

// Member schema
const schema = new  mongoose.Schema( {
    name:{
         type:String,
         required:true
    },
    city:{
        type:String,
        required:true
    },
    contact_no:{
        type:String,
        required:true
    },
    registration_date:{
        type:Date,
        required:true
    },
    email:{
          type:String,
          required:true
    },
    password:{
        type:String,
        required:true
   },
   trainer_id:{
       type:String,
       required:true
   },
   membership:{
       type:Date,
       required:true
   },
   type:{
        type:String,
        required:true
   },
   payment_id:{
    type:String
   },
   trainer_reported:{
       type:Boolean
   }

});


const User = mongoose.model('members',schema);

module.exports = User;