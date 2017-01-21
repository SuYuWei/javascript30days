window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.interimResults = true;

let p = document.createElement('p');
const words = document.querySelector('.words');
const mic = document.querySelector('.mic');
words.appendChild(p);

recognition.addEventListener('result', e => {
	const transcript =  Array.from(e.results)
		.map(result => result[0])
		.map(result => result.transcript)
		.join('');

	mic.classList.add("test");
	p.textContent = transcript;
	if (e.results[0].isFinal){
		mic.classList.remove("test");
		p = document.createElement('p');
		words.appendChild(p);
	}
});

recognition.addEventListener('end', recognition.start);

recognition.start();