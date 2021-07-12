
const express = require('express');
const router = express.Router();
const catchAsync = require('../utilities/catchAsync');
const ExpressError = require('../utilities/ExpressError'); 
const { userSchema } = require('../schemas.js')
const User = require('../models/user');

//route to register page
router.get('/register', (req, res) => {
	res.render('users/register');
});


//rout to save user
router.post('/register', catchAsync( async (req, res, next) => {
	try	{
		const {email, username, password } = req.body;
		const user = new User({ email, username });
		const registeredUser = await User.register(user, password);
		await user.save();
		req.flash('success', 'You have created a new user');
		res.redirect(`/skategrounds`)
	}catch(e){
		req.flash('error', 'Invalid entry!');
		res.redirect('/register');
	}
}))
module.exports = router;
