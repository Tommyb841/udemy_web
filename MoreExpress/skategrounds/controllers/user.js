const User = require('../models/user.js');//{{{
const catchAsync = require('../utilities/catchAsync');
const passport = require('passport');//}}}

//Register
// new Form
module.exports.renderRegister = (req, res) => {//{{{
	res.render('users/register');
}//}}}

// Save user
module.exports.saveUser =  catchAsync( async (req, res, next) => {//{{{
	try	{
		const {email, username, password } = req.body;
		const user = new User({ email, username });
		const registeredUser = await User.register(user, password);
		req.login(registeredUser, err => {
			if (err) return next(err);
			req.flash('success', 'You have created a new user');
			res.redirect(`/skategrounds`)
		})
	}catch(e){
		req.flash('error', 'Invalid entry!');
		res.redirect('/register');
	}
})//}}}

//Login
//Login page 
module.exports.renderLogin =  (req, res) => {//{{{
	res.render('users/login');
}//}}}

//authenticate login
module.exports.login = (req, res) => {//{{{
	req.flash('success', 'You have logged in');
	const redirectUrl =	req.session.returnTo || '/skategrounds';
	delete req.session.returnTo;
	res.redirect(redirectUrl);
}//}}}

//Logout
module.exports.logout = (req, res, next) => {//{{{
	if (req.isAuthenticated()){
		req.logout();
		req.flash('success', 'You have been logged out!');
		return res.redirect('/skategrounds');
	}
	res.redirect('/login')
}//}}}
