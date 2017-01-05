
var keys = document.querySelectorAll(".key");
keys.forEach(function(key){
	key.addEventListener('transitionend',removeTransition);
});

window.addEventListener("keydown",playAudio);

function playAudio(e){
	var audio = document.querySelector("audio[data-key='"+e.keyCode+"']");
	var key = document.querySelector(".key[data-key='"+e.keyCode+"']");
	if(!audio) return;
	audio.currentTime = 0;
	audio.play();
	key.classList.add("playing");
}

function removeTransition(e){
	if(e.propertyName !== "transform") return;
	this.classList.remove("playing");
}

var menu = document.querySelector(".menu");
menu.addEventListener("click",function(){
	this.classList.toggle("open");
});
