const mongoose = require('mongoose');
const Review = require('./reviews');
const Schema = mongoose.Schema;

const spotSchema = new Schema({
	title: String, 
	image: String,
	description: String, 
	location: String,
	reviews: [
		{ 
			type: Schema.Types.ObjectId,
			ref: 'Review' 
		}
	]	
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
