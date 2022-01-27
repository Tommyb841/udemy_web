const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const attributeSchema = new Schema({
	body: String,
	description: String,
	author:{
		type: Schema.Types.ObjectId,
		ref: 'User'
	}
});

module.exports = mongoose.model("Attribute", attributeSchema)
