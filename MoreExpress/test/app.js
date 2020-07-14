var express = require('express');
var app = express();
const axios = require('axios');

app.get("/", function(req,res){
	res.render("landing.ejs");
	console.log("landing.ejs");
});

app.get("/results", (req,res) => {
//	var movies = [];
	var query = req.query.search;
	var url = "https://jsonplaceholder.typicode.com/users";
	axios.get(url)
			.then(function (response) {
				eval(require('locus'));
				console.log("got a response");
				if(response.status === 200){	
					var data = response.data;
					res.render("results.ejs", {data: data});
			}})
	
			.catch(function (error) {
				// handle error
				console.log("there was an error");
			})
});

app.listen(process.env.PORT, process.env.IP, function() {
	console.log("Sever is listening");
});

