//app requirements
const express = require('express');
const router = express.Router();
const catchAsync = require('../utilities/catchAsync');
const ExpressError = require('../utilities/ExpressError'); 
const { userSchema } = require('../schemas.js')
const User = require('../models/user');
const passport = require('passport');

//Register
//route to register form page
router.get('/register', (req, res) => {
	res.render('users/register');
});


// saves user
router.post('/register', catchAsync( async (req, res, next) => {
	try	{
		const {email, username, password } = req.body;
		const user = new User({ email, username });
		const registeredUser = await User.register(user, password);
		req.login(registeredUser, err => {
			if (err) return next(err);
			req.flash('success', 'You have created a new user');
			res.redirect(`/skategrounds`)
		})
	}catch(e){
		req.flash('error', 'Invalid entry!');
		res.redirect('/register');
	}
}))

//Login
//route to login form page
router.get('/login', (req, res) => {
	res.render('users/login');
});

// authenticate login
router.post('/login', passport.authenticate('local', {failureFlash: true, failureRedirect: '/login'}),(req, res) => {
	req.flash('success', 'You have logged in');
	const redirectUrl =	req.session.returnTo || '/skategrounds'
	delete req.session.returnTo;
	res.redirect(redirectUrl);
});

//Logout
router.get('/logout',(req, res, next) => {
	if (req.isAuthenticated()){
		req.logout();
		req.flash('success', 'You have been logged out!');
		return res.redirect('/skategrounds');
	}
	res.redirect('/login')
});

module.exports = router;
