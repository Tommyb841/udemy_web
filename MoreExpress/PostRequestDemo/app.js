var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function  (req,res) {
	res.render("home");
});

app.get("/others", function  (req,res) {
	res.render("other");
});

app.get("/friends", function  (req,res) {
	var friends = ["Thomas", "Jason", "Zig", "Micheal"	];
	res.render("friends", {friends: friends});
});

app.post("/addFriend", function(req,res) {
	console.log(req.body.newFriend);
	res.send("You have reached the POST route!");
});

app.listen(process.env.PORT, process.env.IP, function() {
	console.log("Sever is listening");
});
