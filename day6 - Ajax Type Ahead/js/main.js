const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const cities = [];
const search = document.querySelector(".search");
const suggestions = $(".suggestions");
const mapId = document.getElementById('map');
const useragent = navigator.userAgent;
var map;

if (useragent.indexOf('iPhone') != -1 || useragent.indexOf('Android') != -1 ) {
	mapId.style.width = '100%';
	mapId.style.height = '80vh';
} else {
	mapId.style.width = '800px';
	mapId.style.height = '600px';
}

fetch(endpoint)
	.then(blob => blob.json())
	.then(data => {
		cities.push(...data);
		initMap();
	});

search.addEventListener("input", displayMatches);

function initMap(){
	const mapOptions = {
		center: {lat: 40.7127837, lng: -74.0059413},
		zoom: 8
	}
	map = new google.maps.Map(mapId, mapOptions);

	const contentString = `
		<div id="info-content">
			<div class="city"></div>
			<div class="state"></div>
			<div class="population"></div>
			<div class="grow"></div>
		</div>
	`;

	const infowindow = new google.maps.InfoWindow({
    	content: contentString
  	});

	$.each(cities, function(index,val){
		
		const markerOptions = {
			position: {lat: val.latitude, lng: val.longitude},
			map: map,
			title: val.city+", "+val.state
		}
		const marker = new google.maps.Marker(markerOptions);
		marker.addListener('click', function() {
			infowindow.open(map, marker);
			$(".city").text("City: "+val.city);
			$(".state").text("State: "+val.state);
			$(".population").text("Population: "+val.population);
			$(".grow").text("Growth: "+val.growth_from_2000_to_2013);
		});
	})

	google.maps.event.addListener(map, 'click', function() {
		infowindow.close();
	});
}

suggestions.on("click",".list",function(){
	suggestions.hide();
	const myLatLng = {lat: $(this).data("lat"), lng: $(this).data("lng")};
	
	const mapOptions = {
		center: myLatLng,
		zoom: 14
	}
	map.setOptions(mapOptions);
});


function findMathes(wordToMatch,cities){
	return cities.filter(place => {
		const regex = new RegExp(wordToMatch, 'gi');
		return place.city.match(regex) || place.state.match(regex);
	})
}

function displayMatches(){
	const matchArr = findMathes(this.value, cities);
	if(this.value == "" || matchArr.length == 0){
		suggestions[0].style.display = "none";
	}else{
		suggestions[0].style.display = "block";
	}
	const html = matchArr.sort((a,b) => {
		return b.population - a.population;
	}).map(place => {
		const regex = new RegExp(this.value, 'gi');
		const cityName = place.city.replace(regex, `<span class="tag">${this.value}</span>`);
		const stateName = place.state.replace(regex, `<span class="tag">${this.value}</span>`);

		return `
			<div class="list" data-lat=${place.latitude} data-lng=${place.longitude}>
				<span>${cityName}, ${stateName}</span>
			</div>
			`;
	}).join("");
	suggestions[0].innerHTML = html;
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

