const express = require('express');
const router = express.Router();
const Talent = require('../models/talent');
const catchAsync = require('../utils/catchAsync');
const {validateTalent} = require('../utils/validateSchemas');

const multer = require('multer');
const {storage} = require('../cloudinary'); //Looks for index bydefault. Could have written ../cloudinary/index
const upload = multer({ storage });

router.get('/',catchAsync(async (req, res, next) => {
    const talents = await Talent.find({});
    res.render('./talent-agency/talent-agency',{talents});
}))


router.get('/:id', catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const talents_populate = await Talent.findById(id).populate('freelancers');
    res.render('./talent-agency/talents',{talents: talents_populate});
}))

router.post('/' ,upload.array('file'), validateTalent, catchAsync(async (req, res, next) => {
    let image = {path:"https://res.cloudinary.com/dyb9nhiqu/image/upload/v1639079816/YelpCamp/ci7c5n1woxmybydcljva.jpg",filename:"ci7c5n1woxmybydcljva"};
    let profession_rec = req.body.prof.toLowerCase().replace(/\s+/g, '');
    let existingTalent = await Talent.findOne({profession_rec:profession_rec});
    if (!existingTalent) {
        if (req.files[0] != undefined){
            image = {path:req.files[0].path,filename:req.files[0].pathname}
        }
        let talent = {profession:req.body.prof,
                        image:{
                            url: image.path,
                            filename: image.filename
                        },
                        profession_rec: profession_rec
                    }
        const newTalent = new Talent(talent);
        await newTalent.save();
        res.redirect('./talent-agency');
    }
    res.redirect('./talent-agency');
}))


module.exports = router;