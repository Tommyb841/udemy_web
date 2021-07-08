// app requirements
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const { skategroundSchema, reviewSchema } = require('./schemas.js')
const Skateground = require('./models/skategrounds');
const catchAsync = require('./utilities/catchAsync');
const ExpressError = require('./utilities/ExpressError'); 
const Review = require('./models/reviews');
const skategrounds = require('./routes/skategrounds');

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

const app = express();
//App engine,set,and use
app.engine('ejs',ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(methodOverride("_method"))
app.use(express.urlencoded({ extended: true}))



app.use('/skategrounds', skategrounds)

//App get, post, delete, put functions
app.get('/', (req,res) => {
	res.render('landing')
})

app.all('*', (req, res, next) => {
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
}) 

app.listen(3000, () => {
	console.log("app is listening on port 3000!")
})
 
