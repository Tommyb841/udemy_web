
if (process.env.NODE_ENV !== "production"){
	require('dotenv').config();
}

// app requirements
const express = require('express');//{{{
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const { skategroundSchema, reviewSchema, attributeSchema } = require('./schemas.js');
const catchAsync = require('./utilities/catchAsync');
const session = require('express-session');
const flash = require('connect-flash');
const ExpressError = require('./utilities/ExpressError'); 
const skategroundsRoutes = require('./routes/skategrounds');
//const attributesRoutes = require('./routes/attributes');
const reviewsRoutes = require('./routes/reviews');
const userRoutes = require('./routes/user');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');
const MongoStore = require("connect-mongo")(session);
const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/skategrounds';}}}

//Mongodb connection
mongoose.connect( dbUrl, { //{{{

useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
	.then(() => {
		console.log("Mongo connection open")
	})
	.catch(() => {
		console.log("connection error")
		console.log(err)
	})

mongoose.set('useCreateIndex', true);//}}}

//App - ejs, view engine, views, methodOverride, urlendcoded
const app = express();//{{{

app.engine('ejs',ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true}));
app.use(express.static(path.join(__dirname, 'public')));//}}}

//Session configuration, flash configs ,passport
const secret = process.env.SECRET ||  'Thisshouldbeabettersecret';
const store = new MongoStore({//{{{
	url: dbUrl,
	secret,
	touchAfter: 24*60*60
})

store.on("error",function (e){
	console.log("SESSION STORE ERROR",e)
})
const sessionConfig = {
	store,
	secret,
	resave: false,
	saveUninitialized: true,
	cookie: {
		httpOnly: true,
		expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
		maxAge: 1000 * 60 * 60 * 24 * 7,
	}
}

app.use(session(sessionConfig));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());//}}}

//Flash middleware
app.use((req,res,next) => {//{{{
	res.locals.currentUser = req.user;
	res.locals.success = req.flash('success');
	res.locals.error = req.flash('error');
	next();
})//}}}

// Routers
app.use('/', userRoutes)//{{{
app.use('/skategrounds', skategroundsRoutes)
app.use('/skategrounds/:id/reviews', reviewsRoutes)//}}}
//app.use('/skategrounds/:id/attributes', attributesRoutes)

//landing page route
app.get('/', (req,res) => {//{{{
	res.render('landing')
})//}}}

//error handling
app.all('*', (req, res, next) => {//{{{
  next(new ExpressError('Page Not Found', 404))
})

app.use(( err, req, res, next) => {
  const { statusCode = 500 } = err;
	if (!err.message) err.message = 'Oh No, Something Went Wrong!'
  res.status(statusCode).render('errPage', {err});
})

app.get('/errPage', (err, req, res) => {
	if (!err.message) err.message = 'Oh No, Something Went Wrong!'
  res.render('errPage', {err});
	console.log('got this page lol ')
}) //}}}

// localhost port
app.listen(3000, () => {//{{{
	console.log("app is listening on port 3000!")
})//}}}

