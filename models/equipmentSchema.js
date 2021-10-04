const mongoose = require('mongoose');

// Equipment schema
const equipmentSchema = new  mongoose.Schema({
    equipment_id:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    total_cnt:{
        type:Number,
        required:true
    },
    reports:{
        type:Number,
        required:true
    }
    
});


const Equipment = mongoose.model('equipments',equipmentSchema);

module.exports = Equipment;