
const pressed = [];
const secretCode = 'wesbos';
const text = document.querySelector(".text");
window.addEventListener('keyup', (e) => {
	console.log(e.key);
	pressed.push(e.key);
	console.log(-secretCode.length - 1, pressed.length - secretCode.length);
	pressed.splice(-secretCode.length - 1, pressed.length - secretCode.length);
	if (pressed.join('').includes(secretCode)) {
		console.log('DING DING!');
		cornify_add();
	}
	text.innerHTML = pressed;
	console.log(pressed);
});