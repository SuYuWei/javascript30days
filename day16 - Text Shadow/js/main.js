

const content = document.querySelector(".text-content");
const text = document.querySelector(".text");
const walk = 100;
content.addEventListener('mousemove', handleMouse);

function handleMouse(e) {
	const {offsetWidth: width, offsetHeight: height} = content;
	let {offsetX: x, offsetY: y} = e;

	if(this !== e.target){
		x = x + e.target.offsetLeft;
		y = y + e.target.offsetTop;
	}

	const xWalk = Math.round((x / width * walk) - (walk / 2));
	const yWalk = Math.round((x / height * walk) - (walk / 2));
	// console.log(xWalk, yWalk);
	let shadow;
	if(x > width / 2 && y > height / 2) {
		shadow = `${xWalk * -1}px ${yWalk * -1}px 5px rgba(0,0,0,.6)`;
	}else if(x > width / 2 && y < height / 2) {
		shadow = `${xWalk * -1}px ${yWalk}px 5px rgba(0,0,0,.6)`;
	}else if(x < width / 2 && y > height / 2) {
		shadow = `${xWalk * -1}px ${yWalk}px 5px rgba(0,0,0,.6)`;
	}else {
		shadow = `${xWalk * -1}px ${yWalk * -1}px 5px rgba(0,0,0,.6)`;
	}

	text.style.textShadow = shadow;
}