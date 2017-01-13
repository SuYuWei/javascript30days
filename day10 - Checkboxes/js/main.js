// $("#input_1").attr('checked', true);

var checkBoxes = document.querySelectorAll("input[type=checkbox]");

var lastCheck;

function handleClick(e){

	let isBetween = false;
	if(e.shiftKey && this.checked){
		checkBoxes.forEach(box => {
			if(box === this || box === lastCheck){
				isBetween = !isBetween;
			}
			if(isBetween){
				box.checked = true;
			}
		});
	}
	lastCheck = this;
}

checkBoxes.forEach(box => box.addEventListener("click", handleClick));
