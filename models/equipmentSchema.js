const mongoose = require('mongoose');

// Equipment schema
const schema = new  mongoose.Schema( {
    equipment_id:{
        type:Number,
        required:true
    },
    item_cnt:{
        type:Number,
        required:true
    },
    is_reported:{
        type:Boolean,
        required:true
    }
    

});


const Trainer = mongoose.model('equipments',schema);

module.exports = Equipment;