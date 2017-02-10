const grasss = document.querySelectorAll(".grass");
const kanaheis = document.querySelectorAll(".kanahei");
const scoreBoard = document.querySelector('.score');
const startBtn = document.querySelector('.start');
const timer = document.querySelector('.timer');

let lastgrass;
let timeUp = false;
let score = 0;
let times = 10;
let countdown;

function startGame() {
	clearInterval(countdown);
	startBtn.style.display = "none";
	timeUp = false;
	score = 0;
	times = 10;
	scoreBoard.textContent = `Score : ${score}`;
	timer.textContent = `Times : ${times}`;
	peep();
	countdown = setInterval(()=>{
		times--;
		if(1 < times && times < 4) {
			timer.classList.add('active');
		} else if(times < 0) {
			timer.classList.remove('active');
			clearInterval(countdown);
			return;
		}
		timer.textContent = `Time : ${times}`;
	}, 1000);

	setTimeout(() => {
		timeUp = true;
		startBtn.style.display = "inline-block";
	}, times * 1000);
	
}

function randomTime(min, max) {
	return Math.round(Math.random() * (max - min) + min);
}

function randomGrass(grasss) {
	var randomNum = Math.floor(Math.random() * kanaheis.length);
	const grass = grasss[randomNum];
	// grass.classList.add('up');
	if(grass === lastgrass) {
		return randomGrass(grasss);
	}
	lastgrass = grass;
	return grass;
}

function peep() {
	const time = randomTime(200, 1000);
    const grass = randomGrass(grasss);
    grass.classList.add('up');
    setTimeout(() => {
    	grass.classList.remove('up');
    	if (!timeUp) peep();
    }, time);
}

function bonk(e) {
	console.log(e.isTrusted);
	if(!e.isTrusted) return;
	score++;
	this.classList.remove('up');
	scoreBoard.textContent = `Score : ${score}`;
}

kanaheis.forEach(kanahei => kanahei.addEventListener('click',bonk));