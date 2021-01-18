// app requirements
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const { skategroundSchema } = require('./schemas.js')
const Skateground = require('./models/skategrounds');
const catchAsync = require('./utilities/catchAsync');
const ExpressError = require('./utilities/ExpressError'); 
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

const validateSkateground = (req,res, next) => {
	const { error } = skategroundSchema.validate(req.body);
	if (error) {
		const msg = error.details.map(el => el.message).join(',')
		throw new ExpressError(msg,404)
	} else {
		next();
	}
}
//App get, post, delete, put functions
app.get('/', (req,res) => {
	res.render('landing')
})

app.get('/skategrounds', catchAsync( async (req,res) => {
	const spots = await Skateground.find({});
	res.render('skategrounds/index', { spots })
}))
	
app.get('/skategrounds/new', catchAsync( async (req,res) => {
	res.render('skategrounds/new')
}))

app.get('/skategrounds/:id', catchAsync( async (req,res) => {
	const { id } = req.params;
	const spot = await Skateground.findById(id)
	res.render('skategrounds/show', {spot})
}))

app.post('/skategrounds',validateSkateground, catchAsync( async (req, res, next) => {
//		if(!req.body.skateground) throw new ExpressError('Invalid skateground data', 400);
    const skateground = new Skateground(req.body.skateground);
    await skateground.save();
    res.redirect(`/skategrounds/${skateground._id}`)
}))

app.delete('/skategrounds/:id', catchAsync( async (req,res) => {
		const { id } = req.params;
		const del = await Skateground.findByIdAndDelete(id);
		res.redirect('/skategrounds')

}))
app.get('/skategrounds/:id/edit', catchAsync( async(req,res) => {
	const { id } = req.params;
	const spot = await Skateground.findById(id)
	res.render('skategrounds/edit', {spot})
}))


app.get('/errPage', (err, req, res) => {
	if (!err.message) err.message = 'Oh No, Something Went Wrong!'
  res.render('errPage', {err});
	console.log('got this page lol ')
})   

app.put('/skategrounds/:id', validateSkateground, catchAsync( async(req,res) => {
	const { id } = req.params;
	const spot = await Skateground.findByIdAndUpdate(id, req.body.skateground, {runValidators: true, new: true});
	res.redirect(`/skategrounds/${spot._id}`);
}))

app.all('*', (req, res, next) => {
  next(new ExpressError('Page Not Found', 404))
})

app.use(( err, req, res, next) => {
  const { statusCode = 500 } = err;
	if (!err.message) err.message = 'Oh No, Something Went Wrong!'
  res.status(statusCode).render('errPage', {err});
})


app.listen(3000, () => {
	console.log("app is listening on port 3000!")
})

