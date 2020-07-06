var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var easy = 3;
var hard = 6;
var colors = generateRandomColors(hard);
var pickedColor = pickColor();//randomly selected color
colorDisplay.textContent = pickedColor;
var squares = document.querySelectorAll(".square");
var winCol = document.querySelector("#banner");
var game = document.querySelector("#new");


playgame();
//main game function 
function playgame(){
	for (var i = 0; i < squares.length; i++) {
		squares[i].style.backgroundColor = colors[i]; //add inital colors to squares
		squares[i].addEventListener("click", function(){i //add click listeners to squares
			var picked = this.style.backgroundColor; 	//grab color of picked square
			if(picked === pickedColor){ //compare color to pickedColor
				messageDisplay.textContent="Correct";
				game.textContent = "Play again"
				changeColors(pickedColor);
				winCol.style.backgroundColor = pickedColor;
			}else{
				this.style.backgroundColor = "#232323";
				messageDisplay.textContent="You got it wrong!";
			}
		});
	};
}

game.addEventListener("click", function(){
	//reset background
	winCol.style.backgroundColor = "blue";
	//generate new colors
  colors = generateRandomColors(hard);
	//pick new random color
	pickedColor = pickColor();
	colorDisplay.textContent = pickedColor;
	playgame();
	//change color of squares
	console.log("button clicked")	
});

//changes squares to the color of the picked color
function changeColors(color){
	for (var i = 0; i < squares.length; i++) {
		squares[i].style.backgroundColor = color;
	};
}

//picks random color
function pickColor(){
	var ranNum = Math.floor(Math.random() * colors.length);
	return colors[ranNum];
}

function generateRandomColors(num){
	var genCol = []
	for (var i = 0; i < num; i++) {
		var c = getColors()
		genCol.push(c);
	};
	return genCol;
}

function getColors(){
		var r = Math.floor(Math.random() * 256);
		var g = Math.floor(Math.random() * 256);
		var b = Math.floor(Math.random() * 256);
		var clr = "rgb(" + r +", "+ g +", "+ b +")";	
	return clr;
}
