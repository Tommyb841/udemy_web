const express = require('express');
const router = express.Router();
const catchAsync = require('../utilities/catchAsync');
const ExpressError = require('../utilities/ExpressError'); 
//const catchAsync = require('../utilities/catchAsync');
const { skategroundSchema, reviewSchema } = require('../schemas.js')
const Skateground = require('../models/skategrounds');

const validateSkateground = (req,res, next) => {
	const { error } = skategroundSchema.validate(req.body);
	if (error) {
		const msg = error.details.map(el => el.message).join(',')
		throw new ExpressError(msg,404)
	} else {
		next();
	}
}
const validateReview = (req, res, next) => {
	const {error} = reviewSchema.validate(req.body)
	if (error) {
		const msg = error.details.map(el => el.message).join(',')
		throw new ExpressError(msg,404)
	} else {
		next();
	}
}
router.get('/', catchAsync( async (req,res) => {
	const spots = await Skateground.find({});
	res.render('skategrounds/index', { spots })
}))

router.get('/new', catchAsync( async (req,res) => {
	res.render('skategrounds/new')
}))

router.get('/:id', catchAsync( async (req,res) => {
	const { id } = req.params;
	const spot = await Skateground.findById(req.params.id).populate('reviews')
	res.render('skategrounds/show', {spot})
}))

router.post('/',validateSkateground, catchAsync( async (req, res, next) => {
//		if(!req.body.skateground) throw new ExpressError('Invalid skateground data', 400);
    const skateground = new Skateground(req.body.skateground);
    await skateground.save();
    res.redirect(`/skategrounds/${skateground._id}`)
}))

router.delete('/:id', catchAsync( async (req,res) => {
		const { id } = req.params;
		const del = await Skateground.findByIdAndDelete(id);
		res.redirect('/skategrounds')

}))
router.get('/:id/edit', catchAsync( async(req,res) => {
	const { id } = req.params;
	const spot = await Skateground.findById(id)
	res.render('skategrounds/edit', {spot})
}))


router.put('/:id', validateSkateground, catchAsync( async(req,res) => {
	const { id } = req.params;
	const spot = await Skateground.findByIdAndUpdate(id, req.body.skateground, {runValidators: true, new: true});
	res.redirect(`/skategrounds/${spot._id}`);
}))

module.exports = router;
