//app requirements
const express = require('express');
const router = express.Router();
const catchAsync = require('../utilities/catchAsync');
const ExpressError = require('../utilities/ExpressError'); 
const user = require('../controllers/user')
const { userSchema } = require('../schemas.js')
const User = require('../models/user');
const passport = require('passport');

//Register
//route to register form page
router.route('/register')
	.get(user.renderRegister)
	.post(user.saveUser);

//Login
//route to login form page and authentication 
router.route('/login')
	.get(user.renderLogin)
	.post(passport.authenticate('local', {failureFlash: true, failureRedirect: '/login'}),user.login);

//Logout
router.get('/logout',user.logout);

module.exports = router;
