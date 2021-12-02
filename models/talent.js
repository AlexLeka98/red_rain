const mongoose = require('mongoose');

const talentSchema = new mongoose.Schema({
    profession: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    text: {
        type: String,
        required: true,
        min: 0
    },
    work: [String]
})

const Talent = mongoose.model('Talent', talentSchema);

module.exports = Talent;