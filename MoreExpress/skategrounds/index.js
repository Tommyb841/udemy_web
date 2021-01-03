const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');

const Skatespot = require('./models/skategrounds')

mongoose.connect('mongodb://localhost:27017/skategrounds', { 
	useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
	.then(() => {
		console.log("Mongo connection open")
	})
	.catch(() => {
		console.log("connection error")
		console.log(err)
	})

app.engine('ejs',ejsMate);
app.set('views', path.join(__dirname, 'views/skategrounds'));
app.set('view engine', 'ejs');

app.use(methodOverride("_method"))
app.use(express.urlencoded({ extended: true}))


app.get('/', (req,res) => {
	res.render('landing')
})

app.get('/skategrounds', async (req,res) => {
	const spots = await Skatespot.find({});
	res.render('skategrounds', { spots })
})
	
app.get('/skategrounds/new', async (req,res) => {
	res.render('new')
})

app.get('/skategrounds/:id', async (req,res) => {
	const { id } = req.params;
	const spot = await Skatespot.findById(id)
	res.render('show', {spot})
})

app.post('/skategrounds', async (req, res) => {
    const newSpot = new Skatespot(req.body);
    await newSpot.save();
    res.redirect(`/skategrounds/${newSpot._id}`)
})

app.delete('/skategrounds/:id', async (req,res) => {
		const { id } = req.params;
		const del = await Skatespot.findByIdAndDelete(id);
		res.redirect('/skategrounds')

})
app.get('/skategrounds/:id/edit', async(req,res) => {
	const { id } = req.params;
	const spot = await Skatespot.findById(id)
	res.render('edit', {spot})
})

app.put('/skategrounds/:id', async(req,res) => {
	const { id } = req.params;
	const spot = await Skatespot.findByIdAndUpdate(id, req.body, {runValidators: true, new: true});
	res.redirect(`/skategrounds/${spot._id}`);
	})

app.listen(3000, () => {
	console.log("app is listening on port 3000!")
})

