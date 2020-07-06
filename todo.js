var list = document.querySelector("ul");
//
//creates new todo list
var cloud = document.querySelector("#cloud");
cloud.addEventListener("click", add_todo);
function add_todo(){
	new_li = document.createElement("LI");
	txt = document.createTextNode("deez");
	new_li.appendChild(txt);
	list.appendChild(new_li);	
};
