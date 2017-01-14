var player = $("#player");
var video = player.find('.myVideo');
var skipBtn = player.find("[data-skip]");
var ranges = player.find("input[type=range]");
var progress = player.find(".playProgress");
var bar = player.find(".playBar");
// var mousedown = false;
player.find('.playBtn').on('click',togglePlay);
video.on('click',togglePlay);
video.on('play',updatePlayBtn);
video.on('pause',updatePlayBtn);
video.on('timeupdate',handleProgress);
skipBtn.on('click',skip);
ranges.on('change',handleRange);
ranges.on('mousemove',handleRange);
progress.on('click',scrub);
$(".fullBtn").click(function(){
	if (video[0].requestFullscreen) {
		video[0].webkitRequestFullscreen();
	} else if (video[0].mozRequestFullScreen) {
		video[0].mozRequestFullScreen();
	} else if (video[0].webkitRequestFullscreen) {
		video[0].webkitRequestFullscreen();
	}
})
// progress.on('mousemove',(e)=> mousedown && scrub(e));
// progress.on('mousedown',()=> mousedown = true);
// progress.on('mouseup',()=> mousedown = false);
$(".playVolume").hover(mouseEnter, mouseLeaves);
$(".playRate").hover(mouseEnter, mouseLeaves);
$(".playVolume img").click(function(){
	var icon;
	if(video[0].volume == 0){
		icon = 'img/volume-on.png';
		video[0].volume = 1;
		$("input[name=volume]").val(1);
	} else{
		icon = 'img/volume-off.png';
		video[0].volume = 0
		$("input[name=volume]").val(0);
	}
	$(".playVolume img").attr("src",icon);
});
$(".playRate img").click(function(){
	video[0].playbackRate = 1;
	$("input[name=playbackRate]").val(1);
});

player.hover(function() {
	$(".play_controls").css("bottom","0px");
}, function() {
	$(".play_controls").css("bottom","-32px");
});

function togglePlay(){
	const method = video[0].paused ? 'play' : 'pause';
	video[0][method]();

	video.bind("loadedmetadata",function(){
		var duration = video[0].duration;
		var min = parseInt(duration/60);
		var sec = parseInt(duration%60);
		$(".videoTime").text("/ "+addZero(min)+":"+addZero(sec));
	})
}

function updatePlayBtn(){
	const icon = video[0].paused ? 'img/play.png' : 'img/pause.png';
	$(".playBtn img").attr("src",icon);
}

function skip(){
	video[0].currentTime += parseFloat(this.dataset.skip);
}

function handleRange(){
	video[0][this.name] = this.value;
	var icon;
	if(this.value == 0){
		icon = 'img/volume-off.png';
	}else if(this.value < 0.5){
		icon = 'img/volume-down.png';
	}else{
		icon = 'img/volume-on.png';
	}
	$(".playVolume img").attr("src",icon);
}

function handleProgress(){
	const percent = (video[0].currentTime / video[0].duration) * 100;
	bar.width(percent + '%');
	var playMin = parseInt(video[0].currentTime / 60);
	var playSec = parseInt(video[0].currentTime % 60);
	$(".playTime").text(addZero(playMin)+":"+addZero(playSec));
}
function scrub(e){
	const scrubTime = (e.offsetX / $(this).width()) * video[0].duration;
	video[0].currentTime = scrubTime;
}
function mouseEnter(){
	$(this).width("80px");
	var name = $(this).find("input")[0].name;
	$("input[name="+name+"]").show();
}
function mouseLeaves(){
	$(this).width("20px");
	var name = $(this).find("input")[0].name;
	$("input[name="+name+"]").hide();
}

function addZero(num){
	if(num < 10) {
    	return '0' + num;
  	}else {
    	return num;
  	}
}
