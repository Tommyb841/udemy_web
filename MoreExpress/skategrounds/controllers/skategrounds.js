
//app requiremnets
const catchAsync = require('../utilities/catchAsync');//{{{
const Skateground = require('../models/skategrounds'); 
const ExpressError = require('../utilities/ExpressError'); 
const {cloudinary} = require('../cloudinary');//}}}

//gets index page
module.exports.index = catchAsync( async (req,res) => {//{{{
	const spots = await Skateground.find({});
	res.render('skategrounds/index', { spots })
})//}}}

//New skateground form
module.exports.newForm = (req, res) => {//{{{
	res.render('skategrounds/new');
}//}}}

//Displays skatespot
module.exports.spotDisplay = catchAsync( async (req,res) => { //{{{
	const { id } = req.params;
	const spot = await Skateground.findById(id).populate ({
	path: 'reviews',
        populate: {
            path: 'author'
        }
	}).populate('author');
	if (!spot) {
		req.flash('error', 'Cannot find that spot!');
		return res.redirect('/skategrounds');
	}
	res.render('skategrounds/show', {spot})
})//}}}

//Saves skatespot
module.exports.save = catchAsync( async (req, res, next) => {//{{{
    const skateground = new Skateground(req.body.skateground);
		skateground.image = req.files.map(f => ({ url: f.path, filename: f.filename }));
		skateground.author = req.user._id;
    await skateground.save();
	console.log(skateground)
		req.flash('success', 'You have created a new skate spot');
    res.redirect(`/skategrounds/${skateground._id}`)
})//}}}

//Deletes spot
module.exports.spotDelete =  catchAsync( async (req,res) => {//{{{
		const { id } = req.params;
		const del = await Skateground.findByIdAndDelete(id);
		req.flash('success', 'You have deleted a skate spot');
		res.redirect('/skategrounds')
})//}}}

//Edits spot
module.exports.spotEdit =  catchAsync( async(req,res) => {//{{{
	const { id } = req.params;
	const spot = await Skateground.findById(id)
	res.render('skategrounds/edit', {spot})
})//}}}

//Saves edit
module.exports.saveEdit = catchAsync( async(req,res) => {//{{{
	const { id } = req.params;
	console.log(req.body)
	const spot = await Skateground.findByIdAndUpdate(id, req.body.skateground, {runValidators: true, new: true});
	const imgs = req.files.map(f => ({ url: f.path, filename: f.filename }));
    spot.image.push(...imgs);
    await spot.save();
    if (req.body.deleteImages) {
        for (let filename of req.body.deleteImages) {
            await cloudinary.uploader.destroy(filename);
        }
        await spot.updateOne({ $pull: { image: { filename: { $in: req.body.deleteImages } } } })
    }
	req.flash('success', "You have successfully updated the current skate spot.");
	res.redirect(`/skategrounds/${spot._id}`);
})//}}}
