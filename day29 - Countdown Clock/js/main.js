let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const timerBtn = document.querySelectorAll('[data-time]');
const timerbg = document.querySelector('.timer');


function timer(seconds) {
	clearInterval(countdown);
	const now = Date.now();
	const then = now + seconds * 1000;
	displayTimeLeft(seconds);
	displayEndTime(then);
	countdown = setInterval(() => {
		const secondsLeft = Math.round((then - Date.now()) / 1000);
		// check if we should stop it!
		if(secondsLeft > 0 && secondsLeft < 10) {
			timerbg.classList.add("active");
		}else if(secondsLeft < 0) {
			clearInterval(countdown);
			timerbg.classList.remove("active");
			return;
		}
		displayTimeLeft(secondsLeft);
	}, 1000);
} 

function displayTimeLeft(seconds) {
	const hours = Math.floor(seconds / 3600);
	const mins = Math.floor(seconds % 3600 / 60);
	const secs = seconds % 60;
	// console.log(hours,mins,secs);
	const time = `${hours}:${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`
	timerDisplay.textContent = time;
}

function displayEndTime(timestamp) {
	const end = new Date(timestamp);
	const hour = end.getHours();
	const mins = end.getMinutes();
	endTime.textContent = `Be Back At ${hour > 12 ? hour - 12 : hour} : ${mins < 10 ? '0' : ''}${mins} ${hour > 12 ? 'PM' : 'AM'}`;
}

function startTimer() {
	const seconds = this.dataset.time;
	timer(seconds);
}

timerBtn.forEach(btn => btn.addEventListener('click',startTimer));
document.customForm.addEventListener('submit',function(e){
	e.preventDefault();
	const mins = this.minutes.value;
	console.log(typeof(mins));
	if(mins != Number(mins)){
		return;
	}
	timer(mins * 60); 
	this.reset();
})
