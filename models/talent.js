const mongoose = require('mongoose');

const talentSchema = new mongoose.Schema({
    profession: {
        type: String,
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
    // email: {
    //     type: String
    // },
    // text: {
    //     type: String,
    //     min: 0
    // },
    // work: [String]
})

const Talent = mongoose.model('Talent', talentSchema);

module.exports = Talent;