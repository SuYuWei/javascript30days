
const items = document.querySelector('.items');
let isDown = false;
let startX;
let scrollLeft;

function handleDown(e) {
	isDown = true;
	this.classList.add('active');
	startX = e.pageX - items.offsetLeft;
    scrollLeft = items.scrollLeft;
}

function handleMove(e) {
	if (!isDown) return;
	this.classList.add('active');
	e.preventDefault();
	const x = e.pageX - items.offsetLeft;
    const walk = (x - startX) * 3;
    console.log(x, startX, scrollLeft, walk);
    items.scrollLeft = scrollLeft - walk;
}

function handleUp() {
	isDown = false;
	this.classList.remove('active');
}


items.addEventListener('mousemove',handleMove);
items.addEventListener('mousedown',handleDown);
items.addEventListener('mouseup',handleUp);
items.addEventListener('mouseleave',handleUp);