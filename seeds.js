if (process.env.NODE_ENV != "production") {
    require('dotenv').config();
}

const mongoose = require('mongoose');
const Product = require('./models/product');
const Talent = require('./models/talent');
const {Freelancers} = require('./models/freelancer');
const { sanitize } = require('express-mongo-sanitize');
const dbUrl = process.env.DB_URL;
// 'mongodb://localhost:27017/farmStand'
mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
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
        surname:"Smith",
        price:'20',
        category: 'hour',
        job: 'graphicdesigners'
    },
    {
        name:'Liam',
        surname:"Jones",
        price:'23',
        category: 'hour',
        job: 'videographers'
    },
    {
        name:'Noah',
        surname:"Brown",
        price:'28',
        category: 'hour',
        job: 'nailtechnicians'
    },
    {
        name:'Oliver',
        surname:"Taylor",
        price:'30',
        category: 'hour',
        job: 'videographers'
    },
    {
        name:'Elijah',
        surname:"Williams",
        price:'50',
        category: 'hour',
        job: 'photographers'
    },
    {
        name:'William',
        surname:"Wilson",
        price:'20',
        category: 'hour',
        job: 'makeupartists'
    },
    {
        name:'James',
        surname:"Johnson",
        price:'20',
        category: 'hour',
        job: 'eventplanners'
    },
    {
        name:'Benjamin',
        surname:"Franklin",
        price:'20',
        category: 'hour',
        job: 'photographers'
    },
    {
        name:'Lucas',
        surname:"Davies",
        price:'20',
        category: 'hour',
        job: 'graphicdesigners'
    },
    {
        name:'Cole',
        surname:"Green",
        price:'20',
        category: 'hour',
        job: 'videographers'
    },
    {
        name:'Conor',
        surname:"Clark",
        price:'20',
        category: 'hour',
        job: 'hairtechnicians'
    },
    {
        name:'Isaac',
        surname:"Roberts",
        price:'20',
        category: 'hour',
        job: 'hairtechnicians'
    },
    {
        name:'Lincoln',
        surname:"Lewis",
        price:'20',
        category: 'hour',
        job: 'makeupartists'
    },
    {
        name:'Anthony',
        surname:"Petrov",
        price:'20',
        category: 'hour',
        job: 'eventplanners'
    },
    {
        name:'Dylan',
        surname:"Moore",
        price:'20',
        category: 'hour',
        job: 'eventdecor'
    },
    {
        name:'Thomas',
        surname:"Allen",
        price:'20',
        category: 'hour',
        job: 'eventpresenters'
    },
    {
        name:'Charles',
        surname:"James",
        price:'20',
        category: 'hour',
        job: 'eventpresenters'
    },
    {
        name:'Christopher',
        surname:"Knight",
        price:'20',
        category: 'hour',
        job: 'eventplanners'
    },
    {
        name:'Maverick',
        surname:"Walker",
        price:'20',
        category: 'hour',
        job: 'models'
    },
    {
        name:'Isaiah',
        surname:"Hughes",
        price:'20',
        category: 'hour',
        job: 'models'
    },
    {
        name:'Andrew',
        surname:"Ward",
        price:'20',
        category: 'hour',
        job: 'models'
    },
    {
        name:'Ryan',
        surname:"Bennett",
        price:'20',
        category: 'hour',
        job: 'socialmediainfluencers'
    },
    {
        name:'Adrian',
        surname:"Cook",
        price:'20',
        category: 'hour',
        job: 'socialmediainfluencers'
    },
    {
        name:'Christian',
        surname:"Webb",
        price:'20',
        category: 'hour',
        job: 'socialmediainfluencers'
    },
    {
        name:'Aaron',
        surname:"Jackson",
        price:'20',
        category: 'hour',
        job: 'socialmediainfluencers'
    },
    {
        name:'Luca',
        surname:"Cox",
        price:'20',
        category: 'hour',
        job: 'contentcreators'
    },
    {
        name:'Cooper',
        surname:"Lee",
        price:'20',
        category: 'hour',
        job: 'contentcreators'
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
        profession_rec: "photographers",
        // route: "/talent-agency/photographers",
        image: {
            url: "https://res.cloudinary.com/dyb9nhiqu/image/upload/v1639597316/YelpCamp/photographer_x2367v.jpg",
            filename: "YelpCamp/photographer_x2367v"
        }
        // text: "",
    },
    {
        profession: "Videographers",
        profession_rec: "videographers",
        // route: "/talent-agency/videographers",
        image: {
            url: "https://res.cloudinary.com/dyb9nhiqu/image/upload/v1639597008/YelpCamp/photoshoot-talent-agency_xiog9x.jpg",
            filename: "YelpCamp/photoshoot-talent-agency_xiog9x"
        }
    },
    {
        profession: "Graphic Designers",
        profession_rec: "graphicdesigners",
        // route: "/talent-agency/graphicdesigners",
        image: {
            url: "https://res.cloudinary.com/dyb9nhiqu/image/upload/v1639597007/YelpCamp/graphicdesign_w3lqpj.jpg",
            filename: "YelpCamp/graphicdesign_w3lqpj"
        }
        // text: "",
    },
    {
        profession: "Make Up Artists",
        profession_rec: "makeupartists",
        // route: "/talent-agency/makeupartists",
        image: {
            url: "https://res.cloudinary.com/dyb9nhiqu/image/upload/v1639597007/YelpCamp/makeupartist_vnax6t.jpg",
            filename: "YelpCamp/makeupartist_vnax6t"
        }
        // text: "",
    },
    {
        profession: "Nail Technicians",
        profession_rec: "nailtechnicians",
        // route: "/talent-agency/nailtechnicians",
        image: {
            url: "https://res.cloudinary.com/dyb9nhiqu/image/upload/v1639597007/YelpCamp/nailtechnician_ussrxi.jpg",
            filename: "YelpCamp/nailtechnician_ussrxi"
        }
        // text: "",
    },
    {
        profession: "Hair Technicians",
        profession_rec: "hairtechnicians",
        // route: "/talent-agency/hairtechnicians",
        image: {
            url: "https://res.cloudinary.com/dyb9nhiqu/image/upload/v1639597007/YelpCamp/hairtechnician_erewdg.jpg",
            filename: "YelpCamp/hairtechnician_erewdg"
        }
        // text: "",
    },
    {
        profession: "Event Decor",
        profession_rec: "eventdecor",
        // route: "/talent-agency/eventdecor",
        image: {
            url: "https://res.cloudinary.com/dyb9nhiqu/image/upload/v1639597007/YelpCamp/eventdecor_fmanni.jpg",
            filename: "YelpCamp/eventdecor_fmanni"
        }
        // text: "",
    },
    {
        profession: "Event Planners",
        profession_rec: "eventplanners",
        // route: "/talent-agency/eventplanners",
        image: {
            url: "https://res.cloudinary.com/dyb9nhiqu/image/upload/v1639597008/YelpCamp/eventplanner_xau3yd.jpg",
            filename: "YelpCamp/eventplanner_xau3yd"
        }
        // text: "",
    },
    {
        profession: "Event Presenters",
        profession_rec: "eventpresenters",
        // route: "/talent-agency/eventpresenters",
        image: {
            url: "https://res.cloudinary.com/dyb9nhiqu/image/upload/v1639597008/YelpCamp/eventpresentor_oxvvik.jpg",
            filename: "YelpCamp/eventpresentor_oxvvik"
        }
        // text: "",
    },
    {
        profession: "Models",
        profession_rec: "models",
        // route: "/talent-agency/models",
        image: {
            url: "https://res.cloudinary.com/dyb9nhiqu/image/upload/v1639597007/YelpCamp/model_y5eftd.jpg",
            filename: "YelpCamp/model_y5eftd"
        }
        // text: "",
    },
    {
        profession: "Social Media Influencers",
        profession_rec: "socialmediainfluencers",
        // route: "/talent-agency/socialmediainfluencers",
        image: {
            url: "https://res.cloudinary.com/dyb9nhiqu/image/upload/v1639597007/YelpCamp/influencer_cwjzrq.jpg",
            filename: "YelpCamp/influencer_cwjzrq"
        }
        // text: "",
    },
    {
        profession: "Content Creators",
        profession_rec: "contentcreators",
        // route: "/talent-agency/contentcreators",
        image: {
            url: "https://res.cloudinary.com/dyb9nhiqu/image/upload/v1639597317/YelpCamp/contentcreator_bi2fnt.jpg",
            filename: "YelpCamp/contentcreator_bi2fnt"
        }
        // text: "",
    },
]



async function insertAllFreelancers(seedFreelancers) {
    Freelancers.insertMany(seedFreelancers)
    .then(res => {
        console.log("Added all freelancers",res.length);
    })
    .catch(err => {
        console.log(err)
    })
}

async function insertAllTalents(seedTalents) {
    Talent.insertMany(seedTalents)
    .then(res => {
        console.log("Added all talents",res.length);
    })
    .catch(err => {
        console.log(err)
    })
}

async function removeAllTalents(){
    await Talent.remove({});
}

async function removeAllFreelancers(){
    await Freelancers.remove({});
}

async function getAllTalents(callback){
    let allTalents = await Talent.find({});
    console.log(allTalents.length);
    return allTalents
}

async function getAllFreelancers(){
    let allFreelancers = await Freelancers.find({});
    return allFreelancers
}

async function matchTalentsWithFreelancers(){
    const insertedTalents = await Talent.find({});
    insertedTalents.forEach(talent => {
        Freelancers.find({job: talent.profession_rec}).then(freelancers => {
            // console.log(`talent.profession:  ${talent.profession}`);
            Talent.updateOne({profession_rec: talent.profession_rec},{freelancers: freelancers}).then(res =>{
                console.log(res);
            });
        });
    })
}
// removeAllTalents()
// removeAllFreelancers()
// insertAllFreelancers(seedFreelancers);
// insertAllTalents(seedTalents);
matchTalentsWithFreelancers();



// Freelancers.deleteOne({id:"61b7b8eae1f0206a5fbbfa62"}).then(e => {
//     console.log(e);
// });

// removeAllTalents()

// 61b7d3f7f250e363fc8a0d36 event planner Christofer Knight
