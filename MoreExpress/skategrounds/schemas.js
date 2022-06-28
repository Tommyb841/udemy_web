const Joi = require('joi');
 
module.exports.skategroundSchema = Joi.object({
		skateground: Joi.object({  
		title: Joi.string().min(1).max(40).required(),
	//	image: Joi.string().required(),
		description: Joi.string().min(5).max(200).required(),
	}).required(),
	deleteImages: Joi.array()
});

module.exports.attributeSchema = Joi.object({
	attribute: Joi.object({
		body: Joi.string().required(),
		description: Joi.string().min(1).max(200).required()
	}).required()
})

module.exports.reviewSchema = Joi.object({
	review: Joi.object({
		rating: Joi.number().required().min(1).max(5),
		body: Joi.string().required()
	}).required()
})
