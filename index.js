// If we are in development mode.
if (process.env.NODE_ENV != "production") {
    require('dotenv').config();
}

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

const multer = require('multer');
const {storage} = require('./cloudinary');
const upload = multer(storage);
// const stripe = require('stripe')(stripeSecretKey);

const Events = require('./models/event');
const Talents = require('./models/talent');
const Product = require('./models/product');

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
app.use(helmet());


const sessionOptions = { secret: 'thisisthesecret', resave: false, saveUninitialized: false };
app.use(session(sessionOptions));


app.post('/create-checkout-session', async (req, res) => {
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
});

app.get('/products',async (req,res) => {
    const products = await Product.find({});
    res.send(`ALL PRODUCTS ARE HERE
     ${products}`);
})

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



app.get('/products',async (req,res) => {
    const products = await Product.find({});
    res.send(`ALL PRODUCTS ARE HERE
     ${products}`);
})
// Talent Agency
app.get('/talent-agency',async (req, res) => {
    const talents = await Talents.find({});
    console.log(talents)
    res.render('./talent-agency/talent-agency',{talents});
})

app.get('/talent-agency/:profession', async (req, res) => {
    const { profession } = req.params;
    const professions = await Talents.find({profession_rec:profession});
    res.render('./talent-agency/talents',{professions});
})




app.get("/about-talent/:id", async (req, res) => {
    const { id } = req.params;
    const talent = await Talents.findById(id);
    res.render("./talent-agency/about-talent", { talent });
})





// Education
app.get("/education", (req, res) => {
    res.render("./education/education");
})

// Entertainment
app.get('/entertainment', (req, res) => {
    res.render('./entertainment/entertainment');
})





const port = process.env.PORT || 3000;
app.listen(3000, () => {
    console.log(`Server on port ${port}`);
});

