

const input = document.querySelector(".inputText");
const listContent = document.querySelector(".listContent");
const lists = JSON.parse(localStorage.getItem('lists')) || [];
const checkBoxes = document.querySelectorAll("input");
input.addEventListener("keypress",addList);
listContent.addEventListener('click',toggleDone);
// checkBoxes.forEach(box => box.addEventListener('click',toggleDone));
$(".listContent").on("keypress", ".check-text", editList);

function addList(e){
	if(e.keyCode == 13 && !e.shiftKey){
		e.preventDefault();
		const text = this.innerHTML;
		if(text == '')	return false;
		const list = {
			text,
			done: false
		} 
		lists.push(list);
		localStorage.setItem('lists', JSON.stringify(lists));
		populateList(lists,listContent);
		this.innerHTML = '';
	}
}

function editList(e){
	if(e.keyCode == 13 && !e.shiftKey){
		e.preventDefault();
		const text = $(this).html();
		if(text == '')	return false;
		const index = $(this).siblings("input").data("index");
		lists[index].text = text;
		localStorage.setItem('lists', JSON.stringify(lists));
		$(this).blur();
	}
}

function populateList(plates = [], plateList){
	plateList.innerHTML = plates.map((plate,i) => {
		return `
			<div class="list-item">
				<div class="box-content">
					<input id="box${i}" data-index=${i} type="checkbox" ${plate.done ? 'checked' : ''}>
		            <label for="box${i}" class="check-btn"></label>
		            <div class="check-text" contenteditable="true">${plate.text}</div>
				</div>
		    </div>
		   `;
	}).join('');
}

function toggleDone(e){
	if(!e.target.matches('input')) return;
	const el = e.target;
	const index = el.dataset.index;
	lists[index].done = !lists[index].done;	//e.target.checked
	localStorage.setItem('lists', JSON.stringify(lists));
	// populateList(lists,listContent);
}

populateList(lists, listContent);