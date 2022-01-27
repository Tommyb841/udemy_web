//app requirements
const express = require('express');//{{{
const router = express.Router({ mergeParams: true });
const Skateground = require('../models/skategrounds');
const Attribute = require('../models/attributes');
const { attributeSchema } = require('../schemas.js');
const catchAsync = require('../utilities/catchAsync');
const { isLoggedin, validateAttribute, isAuthor } = require('../middleware');
const ExpressError = require('../utilities/ExpressError'); //}}}

//saves attribute
router.post('/', isLoggedin, validateAttribute, catchAsync(async (req,res) =>{//{{{
	const { id } = req.params;
	const spot = await Skateground.findById(id);
	const attribute = new Attribute(req.body.attribute);
//	attribute.author = req.user._id;
	spot.attributes.push(attribute);
	await attribute.save();
	await spot.save();
	req.flash('success', 'Created a new attribute');
	res.redirect(`/skategrounds/${id}`);
}))//}}}

//deletes attribute
//removed is author
router.delete('/:attributeId', isLoggedin, catchAsync( async (req,res) =>{//{{{
	const {id, attributeId} = req.params;
	await Skateground.findByIdAndUpdate(id, {$pull: {attributes: attributeId}});
	await Attribute.findByIdAndDelete(attributeId);
	res.redirect(`/skategrounds/${id}`);
}))//}}}

module.exports = router;
