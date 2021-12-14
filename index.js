// If we are in development mode.
if (process.env.NODE_ENV != "production") {
    require('dotenv').config();
}
console.log(process.env.NODE_ENV);

const express = require('express');
const app = express();
const fs = require('fs');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const catchAsync = require('./utils/catchAsync');
const ExpressError = require('./utils/ExpressError');


const morgan = require('morgan');
// app.use(morgan('tiny'));



const multer = require('multer');
const {storage} = require('./cloudinary');
const upload = multer({ storage });
// const stripe = require('stripe')(stripeSecretKey);

const Events = require('./models/event');
const Talents = require('./models/talent');
const Product = require('./models/product');
const {Freelancers} = require('./models/freelancer');
const Talent = require('./models/talent');
const { ConnectionCheckedInEvent } = require('mongoose/node_modules/mongodb');
const { application } = require('express');

mongoose.connect('mongodb://localhost:27017/farmStand', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('CONNECTION OPEN')
    })
    .catch(err => {
        console.log("ERROR");
        console.log(err);
    })


app.engine('ejs', ejsMate);
app.set("view engine", "ejs");
app.use(methodOverride('_method'));
app.use(express.static(__dirname + '/public'));
app.use('/assets', express.static(__dirname + '/assets'));
app.use(mongoSanitize());

// Body Parse middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(helmet());



const sessionOptions = { secret: 'thisisthesecret', resave: false, saveUninitialized: false };
app.use(session(sessionOptions));

app.post('/create-checkout-session', catchAsync(async (req, res, next) => {
    const amount = 3210;
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
            {
                price_data: {
                    currency: 'eur',
                    product_data: {
                        name: 'T-shirt',
                    },
                    unit_amount: amount,
                },
                quantity: 1,
            },
        ],
        mode: 'payment',
        success_url: 'http://localhost:3000/success',
        cancel_url: 'http://localhost:3000/event-page',
    });
    res.json({ id: session.id });

}));

app.get('/products',catchAsync(async (req, res, next) => {
    const products = await Product.find({});
    res.send(`ALL PRODUCTS ARE HERE${products}`);
}))

app.get('/success', (req, res) => {
    res.render('success', { dirname: __dirname });
})

app.get('/failure', (req, res) => {
    res.render('failure');
})

app.get('/home', (req, res) => {
    res.render('home');
})

app.get('/', (req, res) => {
    res.render('home');
})

app.get('/events', (req, res) => {
    res.render('./events/events');
})

app.get('/event-page', (req, res) => {
    console.log(stripePublicKey);
    fs.readFile('item.json', function (error, data) {
        if (error) {
            res.status(500).end();
        }
        else {
            res.render('./events/event-page', {
                items: JSON.parse(data),
                stripePublicKey: stripePublicKey
            });
        }
    });
})

app.get('/sports', (req, res) => {
    res.render('sports');
})


app.get('/about', (req, res) => {
    res.render('about');
})



app.get('/products',catchAsync(async (req, res, next) => {
    const products = await Product.find({});
    res.send(`ALL PRODUCTS ARE HERE${products}`);
}))
// Talent Agency
app.get('/talent-agency',catchAsync(async (req, res, next) => {
    const talents = await Talents.find({});
    res.render('./talent-agency/talent-agency',{talents});
}))


app.get('/talent-agency/:id', catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const talents_populate = await Talents.findById(id).populate('freelancers');
    res.render('./talent-agency/talents',{talents: talents_populate});
}))


// Here is the persons profile. His work and everything. about-talent is a bad name
app.get("/about-talent/:id", catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const person = await Freelancers.findById(id);
    res.render("./talent-agency/about-talent", { person });
}));





// Education
app.get("/education", (req, res) => {
    res.render("./education/education");
})

// Entertainment
app.get('/entertainment', (req, res) => {
    res.render('./entertainment/entertainment');
})



//somePostROutes
app.post('/talent-agency', upload.array('file'), catchAsync(async (req, res, next) => {
    let image;
    if (req.files[0] == undefined){
        image = {path:"https://res.cloudinary.com/dyb9nhiqu/image/upload/v1639079816/YelpCamp/ci7c5n1woxmybydcljva.jpg",filename:"ci7c5n1woxmybydcljva"}
    }
    else {
        image = {path:req.files[0].path,filename:req.files[0].pathname}
    }
    let talent = {profession:req.body.proff,
                    image:{
                        url: image.path,
                        filename: image.filename
                    },
                    profession_rec: req.body.proff.toLowerCase().replace(/\s+/g, '')
                }
    const newTalent = new Talent(talent);
    await newTalent.save();
    const talents = await Talents.find({});
    res.render('./talent-agency/talent-agency',{talents});
}))

// Adding a freelancer in a specific field.
app.post('/talent/:id', upload.array('file'), catchAsync(async (req, res, next) => {
    if (req.body.name && req.body.surname){
        const job = await Talent.findOne({_id:req.params.id});
        let freelancer = {name:req.body.name, surname:req.body.surname,price:'33',
            job:job.profession_rec,profileImage:"/assets/profile1.jpg"}
        const newFreelancer = new Freelancers(freelancer);
        await newFreelancer.save();
        const talent = await Talent.findOne({profession_rec: job.profession_rec});
        talent.freelancers.push(newFreelancer);
        await talent.save();
    }
    const { id } = req.params;
    const talents_populate = await Talents.findById(id).populate('freelancers');
    res.render('./talent-agency/talents',{talents: talents_populate});
}))

app.delete('/talent/:freelancer_id/:talent_id', catchAsync(async (req, res, next) => {
    let {freelancer_id,talent_id} = req.params;    
    let free = await Freelancers.find({_id:freelancer_id});
    await Freelancers.deleteOne({_id:freelancer_id}).then(res=> {console.log(res)});
    const talent = await Talent.findOne({_id: talent_id});
    const index = talent.freelancers.indexOf(freelancer_id);
    if (index > -1) { talent.freelancers.splice(index, 1);}
    await talent.save();
    const talents_populate = await Talents.findById(talent_id).populate('freelancers');
    res.render('./talent-agency/talents',{talents: talents_populate});
}))













app.use((err,req,res,next)=>{
    console.log(err.name);
    next(err);
})

// I no longer see the stack error in the browser.
// If we throw any errors, our error handling middleware will
// run. 
app.use((err,req,res,next) => {
    const {status = 500, message="Something went wrong!"} = err;
    res.status(status).send(message);
    return next(err);
})















const port = process.env.PORT || 3000;
app.listen(3000, () => {
    console.log(`Server on port ${port}`);
});