const mongoose = require('mongoose');

const freelancerSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    surname: {
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
        enum: ['hour', 'session', 'week', 'month']
    },
    job: {
        type:String,
        required:true
    },
    profileImage: {
        type: String,
        default:"/assets/profile1.jpg"
    },
    work: {
        type:String
    }
});

const Freelancers = mongoose.model('Freelancers', freelancerSchema);

module.exports = {
    freelancerSchema: freelancerSchema,
    Freelancers: Freelancers
};















