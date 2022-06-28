const mongoose = require('mongoose');
const Review = require('./reviews');
const Schema = mongoose.Schema;
const Attribute = require('./attributes')

const ImageSchema = new Schema({
    url: String,
    filename: String
});

ImageSchema.virtual('thumbnail').get(function(){
	return this.url.replace('/upload', '/upload/w_200');
})

const spotSchema = new Schema({
	title: String, 
	image:[ImageSchema],  
	description: String, 
	location: String,
	author:{
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	attributes: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Attribute'
		}
	],
	reviews: [
		{ 
			type: Schema.Types.ObjectId,
			ref: 'Review' 
		}
	],	
});

spotSchema.post('findOneAndDelete', async function(doc) {
	console.log("deleted!!!")
	if(doc){
		await Review.deleteMany({ 
			_id: {
				$in: doc.reviews
			}
		})
	}
})
const Spot = mongoose.model("Spot", spotSchema);

module.exports = Spot;
