const timeNodes = Array.from(document.querySelectorAll('[data-time]'));

document.querySelectorAll('[data-time]').forEach(ele => {
	ele.innerHTML = `${ele.innerHTML}<span>${ele.dataset.time}</span>`;
});

const seconds = timeNodes
	.map(node => node.dataset.time)
	.map(timeCode => {

		const [mins, secs] = timeCode.split(':').map(parseFloat);
		return (mins * 60) + secs;	
	})
	.reduce((total, vidseconds) => total + vidseconds);

	let scondsLeft = seconds;
	const hours = Math.floor(scondsLeft / 3600);
	scondsLeft = scondsLeft % 3600;
	const mins = Math.floor(scondsLeft / 60);
	scondsLeft = scondsLeft % 60;
	document.querySelector(".total-time").innerHTML = `Total video time: ${hours} hours ${mins} minutes ${scondsLeft} seconds`
	console.log(hours, mins, scondsLeft);