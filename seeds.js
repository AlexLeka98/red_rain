const mongoose = require('mongoose');
const Product = require('./models/product');
const Talent = require('./models/talent');
const {Freelancers} = require('./models/freelancer');
const { sanitize } = require('express-mongo-sanitize');

mongoose.connect('mongodb://localhost:27017/farmStand', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('CONNECTION OPEN')
    })
    .catch(err => {
        console.log("ERROR");
        console.log(err);
    })

const seedFreelancers = [
    {
        name:'Alex',
        price:'20',
        category: 'hour',
        job: 'photographers'
    },
    {
        name:'Liam',
        price:'23',
        category: 'hour',
        job: 'videographers'
    },
    {
        name:'Noah',
        price:'28',
        category: 'hour',
        job: 'photographers'
    },
    {
        name:'Oliver',
        price:'30',
        category: 'hour',
        job: 'videographers'
    },
    {
        name:'Elijah',
        price:'50',
        category: 'hour',
        job: 'photographers'
    },
    {
        name:'William',
        price:'20',
        category: 'hour',
        job: 'videographers'
    },
    {
        name:'James',
        price:'20',
        category: 'hour',
        job: 'photographers'
    },
    {
        name:'Benjamin',
        price:'20',
        category: 'hour',
        job: 'videographers'
    },
    {
        name:'Lucas',
        price:'20',
        category: 'hour',
        job: 'photographers'
    },
    {
        name:'Cole',
        price:'20',
        category: 'hour',
        job: 'videographers'
    },
    {
        name:'Conor',
        price:'20',
        category: 'hour',
        job: 'photographers'
    },
]

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


// Freelancers.insertMany(seedFreelancers)
// .then(res => {
//     console.log("Added all freelancers",res.length);
// })
// .catch(err => {
//     console.log(err)
// })

async function getAllFreelancers(){
    let allFreelancers = await Freelancers.find({});
    return allFreelancers
}

Talent.insertMany(seedTalents)
    .then(res => {
        getAllFreelancers().then((freelancers)=>{
            for (let i = 0; i < freelancers.length; i++) {
                console.log(freelancers[i].job);
                res.forEach(talent => {
                    if (freelancers[i].job === talent.profession_rec) {
                        // console.log(`freelancers[i].job: ${freelancers[i].job}     talent.profession_rec  : ${talent.profession_rec}`)                   
                        talent.freelancers.push(freelancers[i])
                        // talent.save();
                        // console.log(talent.freelancers);
                        // talent.freelancers.push(freelancers[i]);
                    }
                })
            }
        });
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