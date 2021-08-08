//app requirements
const express = require('express');
const router = express.Router();
const catchAsync = require('../utilities/catchAsync');
const ExpressError = require('../utilities/ExpressError'); 
const skateground = require('../controllers/skategrounds');
const user = require('../controllers/user')
const { skategroundSchema, reviewSchema } = require('../schemas.js');
const Skateground = require('../models/skategrounds'); 
const { isLoggedIn , isAuthor , validateSkateground } = require('../middleware');
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });
//route to index page
router.route('/')
	.get(skateground.index)
	//.post( isLoggedIn, validateSkateground, skateground.save);
	.post(upload.array('image'),(req,res) => {
		console.log(req.body, req.files);
		res.send('it yes');
	})

//route to new skatespot page
router.get('/new', isLoggedIn, skateground.newForm);

//route to render, edit, and delete single skate spot page
router.route('/:id')
	.get(skateground.spotDisplay)
	.delete(isLoggedIn, isAuthor, skateground.spotDelete)
	.put( isLoggedIn, isAuthor, validateSkateground, skateground.saveEdit);

//this is to edit the skate spot
router.get('/:id/edit', isLoggedIn, isAuthor, skateground.spotEdit);

//this saves the changes of the edit

module.exports = router;
