const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const cities = [];
const search = document.querySelector(".search");
const suggestions = document.querySelector(".suggestions");

fetch(endpoint)
	.then(blob => blob.json())
	.then(data => cities.push(...data));

search.addEventListener("input",displayMatches);

function findMathes(wordToMatch,cities){
	return cities.filter(place => {
		const regex = new RegExp(wordToMatch, 'gi');
		return place.city.match(regex) || place.state.match(regex);
	})
}

function displayMatches(){
	const matchArr = findMathes(this.value, cities);
	if(this.value == "" || matchArr.length == 0){
		suggestions.style.display = "none";
	}else{
		suggestions.style.display = "block";
	}
	const html = matchArr.sort((a,b) => {
		return b.population - a.population;
	}).map(place => {
		const regex = new RegExp(this.value, 'gi');
		const cityName = place.city.replace(regex, `<span class="tag">${this.value}</span>`);
		const stateName = place.state.replace(regex, `<span class="tag">${this.value}</span>`);
		return `
			<div>
				<span class="name">City: ${cityName}</span>
				<span class="state">State: ${stateName}</span>
				<span class="population">Population: ${numberWithCommas(place.population)}</span>
			</div>
			`;
	}).join('');
	suggestions.innerHTML = html;
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}


