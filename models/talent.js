const mongoose = require('mongoose');
const Freelancers = require('./freelancer');

const talentSchema = new mongoose.Schema({
    profession: {
        type: String,
        lowercase: true,
        required: true
    },
    photo: {
        type: String,
        // required: true
    },
    route: {
        type: String,
        required: true
    }, 
    profession_rec: {
        type: String,
        required: true
    },
    freelancers:{
        type: [String]
    }
});

const Talent = mongoose.model('Talent', talentSchema);

module.exports = Talent;