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
        profession_rec: "photographers",
        route: "/talent-agency/photographers",
        // text: "",
    },
    {
        profession: "Videographers",
        photo: "/assets/videographer.jpg",
        profession_rec: "videographers",
        route: "/talent-agency/videographers",
        // text: "",
    },
    {
        profession: "Graphic Designers",
        photo: "/assets/graphicdesign.jpg",
        profession_rec: "graphicdesigners",
        route: "/talent-agency/graphicdesigners",
        // text: "",
    },
    {
        profession: "Make Up Artists",
        photo: "/assets/makeupartist.jpg",
        profession_rec: "makeupartists",
        route: "/talent-agency/makeupartists",
        // text: "",
    },
    {
        profession: "Nail Technicians",
        photo: "/assets/nailtechnician.jpg",
        profession_rec: "nailtechnicians",
        route: "/talent-agency/nailtechnicians",
        // text: "",
    },
    {
        profession: "Hair Technicians",
        photo: "/assets/hairtechnician.jpg",
        profession_rec: "hairtechnicians",
        route: "/talent-agency/hairtechnicians",
        // text: "",
    },
    {
        profession: "Event Decor",
        photo: "/assets/eventdecor.jpg",
        profession_rec: "eventdecor",
        route: "/talent-agency/eventdecor",
        // text: "",
    },
    {
        profession: "Event Planners",
        photo: "/assets/eventplanner.jpg",
        profession_rec: "eventplanners",
        route: "/talent-agency/eventplanners",
        // text: "",
    },
    {
        profession: "Event Presenters",
        photo: "/assets/eventpresentor.jpg",
        profession_rec: "eventpresenters",
        route: "/talent-agency/eventpresenters",
        // text: "",
    },
    {
        profession: "Models",
        photo: "/assets/model.jpg",
        profession_rec: "models",
        route: "/talent-agency/models",
        // text: "",
    },
    {
        profession: "Social Media Influencers",
        photo: "/assets/influencer.jpg",
        profession_rec: "socialmediainfluencers",
        route: "/talent-agency/socialmediainfluencers",
        // text: "",
    },
    {
        profession: "Content Creators",
        photo: "/assets/contentcreator.jpg",
        profession_rec: "contentcreators",
        route: "/talent-agency/contentcreators",
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

// Product.insertMany(seedProducts)
// .then(res => {
//     console.log(res);
// })
// .catch(err => {
//     console.log(err)
// })