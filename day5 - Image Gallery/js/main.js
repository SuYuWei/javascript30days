var panels =  document.querySelectorAll(".panel");
function toggleOpen(){
	if($(this).hasClass('open')){
		this.classList.remove("open");
	}else if($(".panel").hasClass('open')){
		$(".panel").removeClass("open");
		this.classList.add("open");
	}else{
		this.classList.add("open");
	}
	
}
function toggleActive(e){
	if(e.propertyName.includes("flex")){
		this.classList.toggle("open-active");
	}
}

panels.forEach(panel => panel.addEventListener("click",toggleOpen));
panels.forEach(panel => panel.addEventListener("transitionend",toggleActive));

var gridsBtn =  document.querySelector(".grids");
var rowsBtn =  document.querySelector(".rows");
var colBtn =  document.querySelector(".columns");

gridsBtn.addEventListener("click",function(){
	
});

rowsBtn.addEventListener("click",function(){
	$(".panels").css("flex-direction","column");
	$(".panel").css("flex-direction","row");
});

colBtn.addEventListener("click",function(){
	$(".panels").css("flex-direction","row");
	$(".panel").css("flex-direction","column");
});