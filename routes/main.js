const express = require('express');
const Trainer = require('../models/trainerSchema');
const Report = require('../models/reportSchema');
const Equipment = require('../models/equipmentSchema');
const router = express.Router();

// endpoints
router.get('/',async (req,res) => {
    const trainers = await Trainer.find();
    res.render('index',{
        'trainers':trainers
    });
});

router.post('/post',(req,res) => {
    console.log(req.body);
    res.send(req.body);
})

router.get('/about',(req,res) => {
    res.render('about-us');
});

router.get('/bmi-calculator',(req,res) => {
    res.render('bmi-calculator');
});

router.get('/contact',(req,res) => {
    res.render('contact');
});

// Endpoint to update report Count
router.post('/updateReportCnt',async (req,res) =>{
    
    const {user_id,reported_by,report,equipment_id} = req.body;
    const date = new Date();
    let data =  await Equipment.findOneAndUpdate({_id:equipment_id},{
        $set:{
            reports:report
        }
    });
    let equipment = await Equipment.findOne({_id:equipment_id});
    let equipment_name = equipment.name;
    const newReport = Report({
        user_id:user_id,
        reported_for_id:equipment_id,
        reported_by:reported_by,
        reported_for:equipment_name,
        report_date:date,
        report_type:"Equipment"
    });
    
    try{
        newReport.save();
    }
    catch(error){
        console.log(error);
    } 
    res.end();
   
});

module.exports = router;