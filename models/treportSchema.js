const mongoose = require('mongoose');

// Equipment schema
const schema = new  mongoose.Schema( {
    trainer_id:{
        type:Number,
        required:true
    },
    user_id:{
        type:Number,
        required:true
    },
    user_name:{
        type:String,
        required:true
    },
    report_date:{
        type:Date,
        required:true
    }
    

});


const Trainer = mongoose.model('trainerReport',schema);

module.exports = TrainerReport;