//gets express dependancy
var express = require('express');
//Mysql dependancy
var mysql = require('mysql');

// creates a call to express
const app = express();
//creates a varible that will allow login/connection to a database.
const db = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '@Sxc&SQL841',
	database: 'Inventory'
});

//not sure what this does
var bodyParser = require("body-parser");
//not sure what this does
const axios = require('axios');

//connection to database
db.connect((err) => {
	if(err) {
		throw err;
	}else{
		console.log('connected');
	}
});

//notsure what this does
app.use(bodyParser.urlencoded({extended: true}));
//use to read ejs pages??
app.set("view engine", "ejs");

//list of elements that will be displayed to page
var skategrounds = [
		{name: "Brooklyn banks", 
			image:"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.qhoIwYVgKBkLLIH8Ia_wogHaFk%26pid%3DApi&f=1"},
		{name: "Pyramid ledges", 
			image:"https://www.photosforclass.com/download/px_1525612"},
		{name: "The Pier", 
			image:"https://images.pexels.com/photos/208644/pexels-photo-208644.jpeg?auto=compress&cs=tinysrgb&h=350"}
	]; 

//landing/home page
app.get("/",(req,res) => {
	res.render("landing");
});

//skaterounds pages displays the skate grounds
app.get("/skategrounds",(req,res) => {
	res.render("skategrounds",{skategrounds: skategrounds});
});


app.post("/skategrounds", function(req,res){
	//get data from form and add to skategrounds array
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
	res.render("items");
});
var query = db.query("SELECT * FROM Items");
		
query.on('error',(err)=>{
	throw err;
});

query.on('fields', (fields)=>{
	console.log(fields);
});

query.on('result', (row,res)=>{
	console.log(row.item_name, row.item_desc, row.stock_quantity);
});

db.end((err)=>{
	console.log("connection terminated");
});
//#####################################
app.listen(process.env.PORT, process.env.IP, function(){
		console.log("Skategrounds App has started!!!");
	});
