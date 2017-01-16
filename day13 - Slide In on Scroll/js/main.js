

var image = document.querySelectorAll(".img");

window.addEventListener('scroll', debounce(checkSlide));

// 防止高頻率調用的debounce函数
// that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
function debounce(func, wait = 40, immediate = true) {
	var timeout;
	return function() {
		var context = this, 
			args = arguments;
		var later = function() {
		  timeout = null;
		  if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

function checkSlide(e){
	image.forEach(slideimg => {
		const slideInAt = (window.scrollY + window.innerHeight) - slideimg.height / 2;
		
		const imgBottom = slideimg.offsetTop + slideimg.height;
		console.log("window.scrollY: " + window.scrollY, 
					"window.innerHeight: " + window.innerHeight, 
					"slideimg.height: " + slideimg.height, 
					"slideimg.offsetTop: " + slideimg.offsetTop);
		const isHalfShown = slideInAt > slideimg.offsetTop;
		const isNotScrolledPast = window.scrollY < imgBottom;
		if(isHalfShown && isNotScrolledPast) {
			slideimg.classList.add("active");
		}else {
			slideimg.classList.remove("active");
		}
	});
};
