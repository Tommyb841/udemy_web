var express = require("express");
var app = express();
var bodyParser = require("body-parser");
const axios = require('axios');
var json = 'https://jsonplaceholder.typicode.com/users/1'
var goog = 'https://google.com'
// Make a request for a user with a given ID
axios.get(goog)
			.then((response) => {
				eval(require('locus'))
				// handle success
				var name = response.data.name
				console.log(name);
			})

			.catch(function (error) {
				// handle error
				console.log(error);
				console.log("Something went wrong");
				
			})
