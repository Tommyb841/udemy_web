const Joi = require('joi');
 
module.exports.skategroundSchema = Joi.object({
		skateground: Joi.object({  
		title: Joi.string().min(1).max(40).required(),
		image: Joi.string().required(),
		description: Joi.string().min(5).max(200).required(),
	}).required()
});
