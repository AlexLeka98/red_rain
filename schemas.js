const Joi = require('joi');


module.exports.freelancerSchema = Joi.object({
    name: Joi.string().required(),
    surname: Joi.string().required(),
    price: Joi.string(),
    category: Joi.string().valid('hour', 'session', 'week', 'month'),
    job: Joi.string().required(),
    profileImage:Joi.string(),
    work: Joi.string()
});

module.exports.talentSchema = Joi.object({
    profession: Joi.string().required(),
    photo: Joi.string(),
    image: {
        url: Joi.string().required(),
        filename: Joi.string().required()
    },
    route: Joi.string(),
    profession_rec: Joi.string().required()
});