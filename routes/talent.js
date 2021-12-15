const express = require('express');
const router = express.Router();
const Talent = require('../models/talent');
const Freelancers = require('../models/freelancer');
const catchAsync = require('../utils/catchAsync');
const {validateFreelancer} = require('../utils/validateSchemas');

const multer = require('multer');
const {storage} = require('../cloudinary'); //Looks for index bydefault. Could have written ../cloudinary/index
const upload = multer({ storage });


// Adding a freelancer in a specific field.
router.post('/:id', upload.array('file'), validateFreelancer, catchAsync(async (req, res, next) => {
    console.log("Two");
    if (req.body.name && req.body.surname){
        const job = await Talent.findOne({_id:req.params.id});
        let freelancer = {name:req.body.name, surname:req.body.surname,price:'33',
            job:job.profession_rec,profileImage:"/assets/profile1.jpg"}
        const newFreelancer = new Freelancers(freelancer);
        await newFreelancer.save();
        const talent = await Talent.findOne({profession_rec: job.profession_rec});
        talent.freelancers.push(newFreelancer);
        await talent.save();
    }
    res.redirect(`/talent-agency/${req.params.id}`);
}))


// Deleting a freelancer. Also taking out his id from Talents.
router.delete('/:freelancer_id/:talent_id', catchAsync(async (req, res, next) => {
    let {freelancer_id,talent_id} = req.params;    
    let free = await Freelancers.find({_id:freelancer_id});
    await Freelancers.deleteOne({_id:freelancer_id}).then(res=> {console.log(res)});
    const talent = await Talent.findOne({_id: talent_id});
    const index = talent.freelancers.indexOf(freelancer_id);
    if (index > -1) { talent.freelancers.splice(index, 1);}
    await talent.save();
    res.redirect(`/talent-agency/${talent_id}`);
}))


module.exports = router;