
var secHand = document.querySelector(".sec-hand");
var minHand = document.querySelector(".min-hand");
var hourHand = document.querySelector(".hour-hand");
var eleClock = document.querySelector(".eleClock");
var dateEle = document.querySelector(".date");
var dayEle = document.querySelector(".day");
var linesEle = document.querySelector(".lines");
var diallines = document.getElementsByClassName("diallines");

for(var i = 1; i < 60; i++){
	linesEle.innerHTML += "<div class='diallines'></div>";
	diallines[i].style.transform = "rotate(" + 6 * i + "deg)";
}

function setDate(){
	var now = new Date();
	var sec = now.getSeconds();
	// var secDeg = ((sec/60)*360) + 90;
	var secDeg = sec * 6 + 90;
	secHand.style.transform = "rotate("+secDeg+"deg)";

	var min = now.getMinutes();
	// var minDeg = ((min/60)*360) + 90;
	var minDeg = min * 6 + sec * (360/3600) + 90;
	minHand.style.transform = "rotate("+minDeg+"deg)";

	var hour = now.getHours();
	// var hourDeg = ((hour/12)*360) + 90;
	var hourDeg = hour * 30 + min * (360/720) + 90;
	hourHand.style.transform = "rotate("+hourDeg+"deg)";

	var year = now.getFullYear();
	var mon = now.getMonth() + 1;
	var date = now.getDate();
	
	var weekday = [];
	weekday[0] = "SUN";
    weekday[1] = "MON";
    weekday[2] = "TUE";
    weekday[3] = "WED";
    weekday[4] = "THU";
    weekday[5] = "FRI";
    weekday[6] = "SAT";
    var day = weekday[now.getDay()];

    eleClock.innerHTML = year + "/" + mon + "/" + date + " " + addZero(hour) + ":" + addZero(min) + ":" + addZero(sec) + " " + day;
    dateEle.innerHTML = year + " / " + mon + " / " + date;
    dayEle.innerHTML = day;
}

setInterval(setDate , 1000);

function addZero(num){
	if(num < 10){
		num = "0" + num; 
	}
	return num;
}