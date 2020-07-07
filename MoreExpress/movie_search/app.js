var express = require('express');
var app = express();
const axios = require('axios');
app.set("view engine", "ejs");

app.get("/",(req,res) => {
	res.send("welcome to the home page")
});
app.get("/results", (req,res) => {
//	var movies = [];
	console.log(req.query.search);
	var query = req.query.search;
	var url = "http://www.omdbapi.com/?s="+ query + "&apikey=thewdb";
	axios.get(url)
			.then(function (response) {
				if(response.status === 200){	
				// handle success
				//	for (var i = 0; i < 10; i++) {
				//		movies.push(response.data["Search"][i]["Title"]);
				//	};
				//	console.log(movies);
				//	var result = movies.toString();
					var data = response.data;
					res.render("results", {data: data});


			}})
	
			.catch(function (error) {
				// handle error
				console.log("there was an error");
			})
});

	app.listen(process.env.PORT, process.env.IP, function(){
		console.log("Movie App has started!!!");
	});
