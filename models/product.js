const mongoose = require('mongoose');
const {Schema} = mongoose;

const productSchema = new mongoose.Schema({
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
    farm: {
        type: Schema.Types.ObjectId,
        red: 'Farm'
    }
});

const Products = mongoose.model('Products', productSchema);

module.exports = Products;