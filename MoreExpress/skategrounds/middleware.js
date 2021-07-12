//middleware requirements
const ExpressError = require('./utilities/ExpressError'); 
const { skategroundSchema, reviewSchema } = require('./schemas.js')
const Skateground = require('./models/skategrounds'); 
const catchAsync = require('./utilities/catchAsync');
const Review = require('./models/reviews');

//isLoggedIn module
module.exports.isLoggedIn = (req, res, next) => {
	console.log("user: ", req.user);
	if (!req.isAuthenticated()) {
		req.session.returnTo = req.originalUrl;
		req.flash('error', 'You must be signed in first');
		return res.redirect('/login');
	}
	next();
}

//skateground validation 
module.exports.validateSkateground = (req, res, next) => {
	const { error } = skategroundSchema.validate(req.body);
	if (error) {
		const msg = error.details.map(el => el.message).join(',')
		throw new ExpressError(msg,404)
	} else {
		next();
	}
}

//isAuthor module
module.exports.isAuthor = async (req, res, next) =>{
	const { id } = req.params;
	const skateground = await	Skateground.findById(id);
	console.log("THis is the isAuthor middleware" , req.params )
	if (!skateground.author.equals(req.user._id)) {
		req.flash('error', 'You do not have permission to do that!!');
		return res.redirect(`/skategrounds/${id}`);
	}
 	next();
}
	

// isReviewAuthor module
module.exports.isReviewAuthor = async (req, res, next) => {
    const { id, reviewId } = req.params;
    const review = await Review.findById(reviewId);
    if (!review.author.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to do that!');
        return res.redirect(`/skategrounds/${id}`);
    }
    next();
}

//validateReview module
module.exports.validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

