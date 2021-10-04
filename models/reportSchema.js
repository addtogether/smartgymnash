const mongoose = require('mongoose');

// Equipment schema
const schema = new  mongoose.Schema( {
    reported_for_id:{
        type:String,
        required:true
    },
    user_id:{
        type:String,
        required:true
    },
    reported_by:{
        type:String,
        required:true
    },
    report_date:{
        type:Date,
        required:true
    },
    report_type:{
        type:String,
        required:true
    },
    reported_for:{
        type:String,
        required:true
    }

});


const Report = mongoose.model('reports',schema);

module.exports = Report;