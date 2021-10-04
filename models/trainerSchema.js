const mongoose = require('mongoose');

// Trainer schema
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
    members_cnt:{
        type:Number,
        required:true
    },
    reports:{
        type:Number,
        required:true
    }

});


const Trainer = mongoose.model('trainers',schema);

module.exports = Trainer;