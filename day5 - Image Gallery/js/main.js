var panels =  $(".panels")
var panel = $(".panel");

panel.on("click",toggleOpen);
// panel.on("transitionend",toggleActive);

function toggleOpen(){
	if($(this).hasClass('open')){
		$(this).removeClass("open");
	}else if($(".panel").hasClass('open')){
		panel.removeClass("open");
		$(this).addClass("open");
	}else{
		$(this).addClass("open");
	}

	if($(this).hasClass('open-active')){
		$(this).removeClass("open-active");
	}else if($(".panel").hasClass('open-active')){
		panel.removeClass("open-active");
		$(this).addClass("open-active");
	}else{
		$(this).addClass("open-active");
	}
}

function toggleActive(e){
	if(e.originalEvent.propertyName.indexOf("flex") == 0){
		$(this).toggleClass("open-active");
	}
}

