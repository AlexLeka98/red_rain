const mongoose = require('mongoose');

const talentSchema = new mongoose.Schema({
    name: {
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
    }
})

const Event = mongoose.model('Event', talentSchema);

module.exports = Event;