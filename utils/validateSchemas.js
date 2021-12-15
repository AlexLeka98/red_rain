const Talent = require('../models/talent');
const {freelancerSchema, talentSchema} = require('../schemas');
const catchAsync = require('./catchAsync');

const validateTalent = (req, res, next) => {
    let image;
    if (req.files[0] == undefined){
        image = {path:"https://res.cloudinary.com/dyb9nhiqu/image/upload/v1639079816/YelpCamp/ci7c5n1woxmybydcljva.jpg",filename:"ci7c5n1woxmybydcljva"}
    }
    else {
        image = {path:req.files[0].path,filename:req.files[0].filename}
    }
    let talent = {profession:req.body.prof,image:{
                        url: image.path,
                        filename: image.filename
                    },profession_rec: req.body.prof.toLowerCase().replace(/\s+/g, '')}
    const {error} = talentSchema.validate(talent);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}


const validateFreelancer = catchAsync(async (req, res, next) => {
    const job = await Talent.findOne({_id:req.params.id});
    let freelancer = {name:req.body.name, surname:req.body.surname,price:'33',
    job:job.profession_rec,profileImage:"/assets/profile1.jpg"};
    const {error} = freelancerSchema.validate(freelancer);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
});




module.exports = {validateTalent, validateFreelancer}