const mongoose = require('mongoose');
const Product = require('./models/product');
const Talent = require('./models/talent');

mongoose.connect('mongodb://localhost:27017/farmStand', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('CONNECTION OPEN')
    })
    .catch(err => {
        console.log("ERROR");
        console.log(err);
    })


const seedProducts = [
    {
        name: 'Ruby Grapefruit',
        price:1.99,
        category:'fruit'
    },
    {
        name: 'Apple',
        price:1.99,
        category:'fruit'
    },
    {
        name: 'Cucomber',
        price:1.99,
        category:'vegetable'
    },
    {
        name: 'yogurt',
        price:1.99,
        category:'diary'
    },
    {
        name: 'Cheese',
        price:1.99,
        category:'diary'
    },
    {
        name: 'Watermelon',
        price:1.99,
        category:'fruit'
    },
    {
        name: 'tomato',
        price:1.99,
        category:'vegetable'
    },
]

const seedTalents = [
    {
        profession: "Photographers",
        photo: "/assets/photoshoot-talent-agency.jpg",
        // surname: "",
        route: "/talent-agency/photographer",
        // text: "",
    },
    {
        profession: "Videographers",
        photo: "/assets/videographer.jpg",
        // surname: "",
        route: "/talent-agency/videographer",
        // text: "",
    },
    {
        profession: "Graphic Designers",
        photo: "/assets/graphicdesign.jpg",
        // surname: "",
        route: "/talent-agency/graphicdesigner",
        // text: "",
    },
    {
        profession: "Make Up Artists",
        photo: "/assets/makeupartist.jpg",
        // surname: "",
        route: "/talent-agency/makeup",
        // text: "",
    },
    {
        profession: "Nail Technicians",
        photo: "/assets/nailtechnician.jpg",
        // surname: "",
        route: "/talent-agency/nail",
        // text: "",
    },
    {
        profession: "Hair Technicians",
        photo: "/assets/hairtechnician.jpg",
        // surname: "",
        route: "/talent-agency/hair",
        // text: "",
    },
    {
        profession: "Event Decor",
        photo: "/assets/eventdecor.jpg",
        // surname: "",
        route: "/talent-agency/eventdecor",
        // text: "",
    },
    {
        profession: "Event Planners",
        photo: "/assets/eventplanner.jpg",
        // surname: "",
        route: "/talent-agency/eventplanner",
        // text: "",
    },
    {
        profession: "Event Presenters",
        photo: "/assets/eventpresentor.jpg",
        // surname: "",
        route: "/talent-agency/eventhost",
        // text: "",
    },
    {
        profession: "Models",
        photo: "/assets/model.jpg",
        // surname: "",
        route: "/talent-agency/model",
        // text: "",
    },
    {
        profession: "Social Media Influencers",
        photo: "/assets/influencer.jpg",
        // surname: "",
        route: "/talent-agency/socialmediainfluencer",
        // text: "",
    },
    {
        profession: "Content Creators",
        photo: "/assets/contentcreator.jpg",
        // surname: "",
        route: "/talent-agency/contentcreator",
        // text: "",
    },
]


Talent.insertMany(seedTalents)
.then(res => {
    console.log(res);
})
.catch(err => {
    console.log(err)
})

Product.insertMany(seedProducts)
.then(res => {
    console.log(res);
})
.catch(err => {
    console.log(err)
})