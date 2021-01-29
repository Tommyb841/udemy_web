const Skateground = require('../models/skategrounds');
const mongoose = require('mongoose');
const {titles, descriptors, images} = require('./seedHelper')
mongoose.connect('mongodb://localhost:27017/skategrounds', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const seedDB = async () => {
	for (var i = 0; i < titles.length; i++) {
		const spot = new Skateground ({ 
			title: `${titles[i]}`,
			description: `${ descriptors[i]}`,
			image:`${ images[i]}`
		})
		await spot.save();
	}
}
seedDB().then(() => {
    mongoose.connection.close();
})
