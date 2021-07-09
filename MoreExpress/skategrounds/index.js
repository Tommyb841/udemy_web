// app requirements
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const { skategroundSchema, reviewSchema } = require('./schemas.js');
const catchAsync = require('./utilities/catchAsync');
const ExpressError = require('./utilities/ExpressError'); 
const skategrounds = require('./routes/skategrounds');
const reviews = require('./routes/reviews');

//Mongodb connection
mongoose.connect('mongodb://localhost:27017/skategrounds', { 
	useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
	.then(() => {
		console.log("Mongo connection open")
	})
	.catch(() => {
		console.log("connection error")
		console.log(err)
	})

//App - ejs, view engine, views, methodOverride, urlendcoded
const app = express();
app.engine('ejs',ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(methodOverride("_method"))
app.use(express.urlencoded({ extended: true}))

// Routers
app.use('/skategrounds', skategrounds)
app.use('/skategrounds/:id/reviews', reviews)

//landing page route
app.get('/', (req,res) => {
	res.render('landing')
})

//error handling
app.all('*', (req, res, next) => {
  next(new ExpressError('Page Not Found', 404))
})

app.use(( err, req, res, next) => {
  const { statusCode = 500 } = err;
	if (!err.message) err.message = 'Oh No, Something Went Wrong!'
  res.status(statusCode).render('errPage', {err});
	console.log('this is what you are getting')
})

app.get('/errPage', (err, req, res) => {
	if (!err.message) err.message = 'Oh No, Something Went Wrong!'
  res.render('errPage', {err});
	console.log('got this page lol ')
}) 


// localhost port
app.listen(3000, () => {
	console.log("app is listening on port 3000!")
})
