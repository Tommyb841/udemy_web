var p1Button= document.querySelector("#p1");
var p2Button= document.querySelector("#p2");
var rset = document.getElementById("rset");
var p1Display = document.querySelector("#p1Display")
var p2Display = document.querySelector("#p2Display")
var p1score = 0;
var p2score = 0;
var numInput = document.querySelector("input");
var playto = document.getElementById("playtolim");
var winningscore = 5;
var gameover = false;

p1Button.addEventListener("click", function(){
	if(!gameover){
		p1score ++;
		if(p1score === winningscore){
			p1Display.classList.add("winner");
			gameover = true;
		}
		p1Display.textContent = p1score;
	}
});

p2Button.addEventListener("click", function(){
	if(!gameover){
		p2score ++;
		if(p2score === winningscore){
			p2Display.classList.add("winner");
			gameover = true;
		}
		p2Display.textContent = p2score;
	}
});

rset.addEventListener("click", function(){
	reset();
});
//resets the scores
function reset(){
	p1score=0;
	p2score=0;
	p1Display.textContent = 0;
	p2Display.textContent = 0;
	p1Display.classList.remove("winner");
	p2Display.classList.remove("winner");
	gameover = false;	
}
// set playing to limit 
numInput.addEventListener("change", function(){
	playtolim.textContent =numInput.value;
	winningscore = Number(numInput.value);
	reset();
});

