const mongoose = require('mongoose');

const freelancerSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    price: {
        type:Number,
        required:true,
        min:0
    },
    category: {
        type:String,
        lowercase:true,
        enum: ['fruit', 'vegetable', 'diary']
    },
    job: {
        type:String,
        required:true
    }
});

const Freelancers = mongoose.model('Freelancers', freelancerSchema);

module.exports = Freelancers;