var express = require('express');
var mysql = require('mysql');

const app = express();
const db = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '@Sxc&SQL841',
	database: 'Inventory_app'
});


var bodyParser = require("body-parser");
const axios = require('axios');

db.connect((err) => {
	if(err) {
		throw err;
	}else{
		console.log('connected');
	}
});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var skategrounds = [
		{name: "Brooklyn banks", 
			image:"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.qhoIwYVgKBkLLIH8Ia_wogHaFk%26pid%3DApi&f=1"},
		{name: "Pyramid ledges", 
			image:"https://www.photosforclass.com/download/px_1525612"},
		{name: "The Pier", 
			image:"https://images.pexels.com/photos/208644/pexels-photo-208644.jpeg?auto=compress&cs=tinysrgb&h=350"}
	]; 

app.get("/",(req,res) => {
	res.render("landing");
});

app.get("/skategrounds",(req,res) => {
	res.render("skategrounds",{skategrounds: skategrounds});
});


app.post("/skategrounds", function(req,res){
	//get data from form and add to skategrounds arrayi
	var name = req.body.name;
	var image = req.body.image
	var newSkateground = {name: name, image: image};
	skategrounds.push(newSkateground);	
	//redirect to /skategrounds page
	res.redirect("/skategrounds");
	
});

app.get("/skategrounds/new",(req,res) => {
	res.render("new");
});

//######################################
//this is trial database code
app.get("/skategrounds/items",function(req,res){
	db.query("SELECT * FROM Items", function(err, result, rows){
		if(err) throw err;
		console.log("result: " + rows);
	});
});
//#####################################
app.listen(process.env.PORT, process.env.IP, function(){
		console.log("Skategrounds App has started!!!");
	});
