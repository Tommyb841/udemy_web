//gets express dependancy
var express = require('express');
//Mysql dependancy
var mysql = require('mysql');

const app = express();
//creates a varible that will allow login/connection to a database.
const db = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '@Sxc&SQL841',
	database: 'Inventory_app'
});


const bodyParser = require("body-parser");
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
var searched_item = [];

app.post("/skategrounds/items",(req,res)=>{
	//get data from form
	var item = req.body.add_item;
	var srch = req.body.search_item;		
	var sql = 'SELECT * FROM Items WHERE item_name = ?';
	var sqlq = mysql.format(sql,srch);
	var query1 = db.query('SELECT * FROM Items WHERE item_name = ?',srch);
	var query2 = db.query('SELECT * FROM Items ');
	
	query2
		.on('result',(row, res)=>{
		var find = [row.item_name, row.item_desc, row.stock_quantity, row.vendor, row.item_id ];
		searched_item.push(find);
		console.log(mysql.format(row.item_desc));
		});

	//console.log(sqlq);
	//db.query(sqlq,(err,result,fields)=>{
	//	if (err) throw err;
	//	console.log(fields.item_name);
	//	searched_item.push(mysql.format(result));
	//	
	//}) 
	res.redirect("/skategrounds/items");
});
//this is trial database code

app.get("/skategrounds/items",function(req,res){
	res.render("items",{searched_item: searched_item});
});
//
//query.on('fields', (fields)=>{
	//console.log(fields);
//});

//query.on('result', (row,res)=>{
//	console.log(row.item_name, row.item_desc, row.stock_quantity);
//});
//
//db.end((err)=>{
//	console.log("connection terminated");
//});
lol
app.listen(process.env.PORT, process.env.IP, function(){
		console.log("Skategrounds App has started!!!");
	});
