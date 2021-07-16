//app requirements
const express = require('express');//{{{
const router = express.Router({ mergeParams: true });
const Skateground = require('../models/skategrounds');
const Review = require('../models/reviews');
const { reviewSchema } = require('../schemas.js');
const catchAsync = require('../utilities/catchAsync');
const { isLoggedIn, validateReview, isAuthor } = require('../middleware');
const ExpressError = require('../utilities/ExpressError'); //}}}

//Saves review
router.post('/', isLoggedIn, validateReview,  catchAsync(async (req,res) =>{//{{{
	const { id } = req.params;
	const spot = await Skateground.findById(id);
	const review = new Review(req.body.review);
	review.author = req.user._id;
	spot.reviews.push(review);
	await review.save();
	await spot.save();
	req.flash('success', 'Created a new review');
	res.redirect(`/skategrounds/${id}`);
}))//}}}

//Deletes review
router.delete('/:reviewId', isLoggedIn, isAuthor, catchAsync( async (req,res) =>{//{{{
	const {id, reviewId} = req.params;
	await Skateground.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
	await Review.findByIdAndDelete(reviewId);
	res.redirect(`/skategrounds/${id}`);
}))//}}}


module.exports = router;
