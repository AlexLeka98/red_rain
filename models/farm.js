const mongoose = require('mongoose');
const {Schema} = mongoose;

mongoose.connect('mongodb://localhost:27017/farmStand', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('CONNECTION OPEN')
    })
    .catch(err => {
        console.log("ERROR");
        console.log(err);
    })

// ONE, productSchema
const productSchema = new mongoose.Schema({
    name: {
        type:String
    },
    price: {
        type:Number
    },
    season: {
        type:String,
        enum: ['Spring','Summer','Fall','Winter']
    },
});

//TWO, farmSchema
const farmSchema = new mongoose.Schema({
    name: {
        type:String
    },
    city: {
        type:String
    },
    email: {
        type:String,
        // required:[true, 'Email required!']
    },
    products: [
        {
            type:Schema.Types.ObjectId,
            ref: 'Product'
        }
    ]
});

const Product = mongoose.model('Product', productSchema);
const Farm = mongoose.model('Farm', farmSchema);



// Product.insertMany([
//     {name: 'Goddess Melon', price: 4.99, season: 'Summer'},
//     {name: 'Sugar baby', price: 4.99, season: 'Summer'},
//     {name: 'Asparagus', price: 4.99, season: 'Spring'},
// ])

// Farm.insertMany([
//     {name: 'Goddess Melon', price: 4.99, season: 'Summer'},
//     {name: 'Sugar baby', price: 4.99, season: 'Summer'},
//     {name: 'Asparagus', price: 4.99, season: 'Spring'},
// ]);

const makeFarm = async ()=>{
    const farm = await new Farm({name: 'Full Belly Farms', city: 'Guinda, CA'});
    // const farm = await Farm.find({name: 'Jelly Farm'});
    const sugar = await Product.findOne({name: 'Sugar baby'});
    farm.products.push(sugar);
    // console.log(farm);
    // farm[0].products.push(sugar);
    await farm.save();

}
// makeFarm();

const addProduct = async () => {
    const farm = await Farm.findOne({name:'Full Belly Farms'});
    const sugar =  await Product.findOne({name : 'Asparagus'});
    farm.products.push(sugar);
    await farm.save();
    console.log(farm);
}
// addProduct()

Farm.findOne({name: 'Full Belly Farms'})
.populate('products').then(farm => console.log(farm)); 

module.exports = Farm;