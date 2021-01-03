const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const spotSchema = new Schema({
	title: String, 
	image: String,
	description: String, 
	location: String
	
});

const Spot = mongoose.model("Spot", spotSchema);

module.exports = Spot;
