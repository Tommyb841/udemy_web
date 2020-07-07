var express = require('express');
var app = express();
const axios = require('axios');
app.set("view engine", "ejs");

app.get("/",(req,res) => {
	res.render("landing");
});

app.get("/skategrounds",(req,res) => {
	var skategrounds = [
		{name: "Brooklyn banks", image:"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.qhoIwYVgKBkLLIH8Ia_wogHaFk%26pid%3DApi&f=1"},
		{name: "Pyramid ledges", image:"https://www.photosforclass.com/download/px_1525612"},
		{name: "The Pier", image:"https://images.pexels.com/photos/208644/pexels-photo-208644.jpeg?auto=compress&cs=tinysrgb&h=350"}
	] 
	res.render("skategrounds",{skategrounds: skategrounds});
});


	app.listen(process.env.PORT, process.env.IP, function(){
		console.log("Movie App has started!!!");
	});
