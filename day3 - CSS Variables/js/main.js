var inputs = document.querySelectorAll('#controls input');

function handleUpdate(){
	var suffix = this.dataset.sizing || '';
	document.documentElement.style.setProperty("--"+this.name, this.value + suffix);
}

inputs.forEach(function(input){
	input.addEventListener('change', handleUpdate);
	input.addEventListener('mousemove', handleUpdate);
})
