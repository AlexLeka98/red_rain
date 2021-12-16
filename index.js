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
const talentAgencyRoutes = require('./routes/talent-agency');
const talentRoutes = require('./routes/talent');
const createCheckoutSessionRoutes = require('./routes/create-checkout-session');
const flash = require('connect-flash');
const morgan = require('morgan');
app.use(morgan('tiny'));
app.use(session({ secret: 'thisisnotagoodsecret', resave: false, saveUninitialized: false})); //req.sess property now.
app.use(flash);


const {Freelancers} = require('./models/freelancer');
const ExpressError = require('./utils/ExpressError');
const catchAsync = require('./utils/catchAsync');

const dbUrl = process.env.DB_URL;

// dbUrl
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
console.log("Hey There!");
// Body Parse middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(helmet({contentSecurityPolicy: false}));



const sessionOptions = { secret: 'thisisthesecret', resave: false, saveUninitialized: false };
app.use(session(sessionOptions));



app.use('/talent-agency',talentAgencyRoutes);
app.use('/talent',talentRoutes);
app.use('/create-checkout-session',createCheckoutSessionRoutes);


app.get('/viewcount', (req,res) => {
    console.log(req.session.count);
    if (req.session.count == undefined) {
        req.session.count = 0;
    }
    else{
        req.session.count = req.session.count + 1;
    }
    res.send(`You have viewed this page ${req.session.count} time(s)`);
})




app.get('/success', (req, res) => {
    res.render('success', { dirname: __dirname });
})

app.get('/failure', (req, res) => {
    res.render('failure');
})

app.get('/home', (req, res) => {
    console.log('Hello!');
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

app.get('/about', (req, res) => {
    res.render('about');
})


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

app.get('/test',(req,res)=>{
    req.flash('success', 'Succesfully made a new flash');
    // res.render('')
    res.send('heyy!');
})



// Middleware, and error handlers

app.all('*', (req, res, next)=>{
    next(new ExpressError('Page Not Found', 404));
})


// I no longer see the stack error in the browser.
// If we throw any errors, our error handling middleware will run. 
app.use((err,req,res,next) => {
    const {statusCode = 500} = err;
    if (!err.message) err.message = 'Oh no, something went wrong!';
    res.status(statusCode).render('error',{error:err});
})



const port = process.env.PORT || 3000;
app.listen(3000, () => {
    console.log(`Server on port ${port}`);
});