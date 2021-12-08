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

async function removeAllTalents(){
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

    // What I did before using save()
    // const insertedTalents = await Talent.find({});
    // insertedTalents.forEach(talent => {
    //     Freelancers.find({job: talent.profession_rec}).then(freelancers => {
    //         console.log(talent.profession_rec);
    //         console.log(freelancers);
    //         talent.freelancers.push(...freelancers);
    //         talent.save();
    //     });
    // })
}
// insertAllFreelancers(seedFreelancers);
// insertAllTalents(seedTalents);

matchTalentsWithFreelancers();

// removeAllTalents()

// Testing
