//app requirements
const express = require('express');
const router = express.Router();
const catchAsync = require('../utilities/catchAsync');
const ExpressError = require('../utilities/ExpressError'); 
const { skategroundSchema, reviewSchema } = require('../schemas.js')
const Skateground = require('../models/skategrounds'); 
const { isLoggedIn , isAuthor , validateSkateground } = require('../middleware');

//route to index page
router.get('/', catchAsync( async (req,res) => {
	const spots = await Skateground.find({});
	res.render('skategrounds/index', { spots })
}))

//route to new skatespot page
router.get('/new', isLoggedIn, (req, res) => {
	res.render('skategrounds/new')
});

//route to display single skate spot page
router.get('/:id', catchAsync( async (req,res) => {
	const { id } = req.params;
	const spot = await Skateground.findById(id).populate ({
	path: 'reviews',
        populate: {
            path: 'author'
        }
	}).populate('author');
	if (!spot) {
		req.flash('error', 'Cannot find that spot!');
		return res.redirect('/skategrounds');
	}
	res.render('skategrounds/show', {spot})
}))

//this saves the new skatespot
router.post('/', isLoggedIn, validateSkateground, catchAsync( async (req, res, next) => {
    const skateground = new Skateground(req.body.skateground);
		skateground.author = req.user._id;
    await skateground.save();
		req.flash('success', 'You have created a new skate spot');
    res.redirect(`/skategrounds/${skateground._id}`)
}))

//this deletes the skatespot
router.delete('/:id', isLoggedIn, isAuthor,  catchAsync( async (req,res) => {
		const { id } = req.params;
		const del = await Skateground.findByIdAndDelete(id);
		req.flash('success', 'You have deleted a skate spot');
		res.redirect('/skategrounds')
}))

//this is to edit the skate spot
router.get('/:id/edit', isLoggedIn, isAuthor,  catchAsync( async(req,res) => {
	const { id } = req.params;
	const spot = await Skateground.findById(id)
	res.render('skategrounds/edit', {spot})
}))

//this saves the changes of the edit
router.put('/:id', isLoggedIn, isAuthor, validateSkateground, catchAsync( async(req,res) => {
	const { id } = req.params;
	const spot = await Skateground.findByIdAndUpdate(id, req.body.skateground, {runValidators: true, new: true});
	req.flash('success', "You have successfully updated the current skate spot.");
	res.redirect(`/skategrounds/${spot._id}`);
}))

module.exports = router;
