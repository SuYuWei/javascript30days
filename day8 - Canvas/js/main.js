var myCanvas = document.getElementById("myCanvas");
myCanvas.width = window.innerWidth;
myCanvas.height = window.innerHeight;
var ctx = myCanvas.getContext("2d");
ctx.strokeStyle = "black";

ctx.lineJoin = 'round';
ctx.lineCap = 'round';
var isdrawing = false;
var lastX = 0;
var lastY = 0;
function draw(e){
	if(!isdrawing) return;
	// console.log(e);
	ctx.beginPath();
	ctx.moveTo(lastX,lastY);
	ctx.lineTo(e.offsetX,e.offsetY);
	ctx.stroke();
	lastX = e.offsetX;
	lastY = e.offsetY;
}

myCanvas.addEventListener("mousemove", draw);
myCanvas.addEventListener("mousedown", (e) => {
	isdrawing = true;
	lastX = e.offsetX;
	lastY = e.offsetY;
});
myCanvas.addEventListener("mouseup", () => isdrawing = false);
myCanvas.addEventListener("mouseout", () => isdrawing = false);


var inputs = document.querySelectorAll('.side-content input');
inputs.forEach(function(input){
	input.addEventListener('change', handleUpdate);
	input.addEventListener('mousemove', handleUpdate);
})

function handleUpdate(){
	var suffix = this.dataset.sizing || '';
	document.documentElement.style.setProperty("--"+this.name, this.value + suffix);
	switch(this.name){
		case 'color':
			ctx.strokeStyle = this.value;
			$(".color-val").text('color: ' + this.value);
		break;
		case 'lineH':
			ctx.lineWidth = this.value;
			$(".line-val").text('line width: ' + this.value);
		break;
	}
	
	
}
