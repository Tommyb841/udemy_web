var but = document.querySelector(".clr");
//var clicked = true;
//but.addEventListener("click",function(){
//
//	if(clicked){
//		document.body.style.background = "blue";
//	}else{
//		document.body.style.background = "black";
//	}
//	clicked = !clicked
//});
but.addEventListener("click",function(){
	document.body.classList.toggle("purple");
});
