const restCountryApiUrl = "https://restcountries.com/v3/all";

function createCard(cardDetails) {
	var name = cardDetails.name.common;
	var flagURL = cardDetails.flags[0];
	var region = cardDetails.region;
	var cCode = cardDetails.cca2;
	var cCapital = "";
	if(cardDetails.capital!=undefined)
		cCapital=cardDetails.capital[0];

	var card = document.createElement('div');
	card.setAttribute('class', 'card card-bg');
	card.setAttribute('id', cCode + '-card');

	var countryHeading = document.createElement('h6');
	countryHeading.setAttribute('class', 'card-header text-center');
	countryHeading.setAttribute('id', cCode + '-name');
	countryHeading.innerText = name;
	card.append(countryHeading);

	var countryFlag = document.createElement('img');
	countryFlag.setAttribute('class', 'img-bg');
	countryFlag.setAttribute('src', flagURL);
	card.append(countryFlag);

	var countryBody = document.createElement('div');
	var capital = document.createElement('div');
	capital.setAttribute('class', 'card-text');
	capital.setAttribute('id', cCode + '-capital');
	capital.innerText = `Capital: ${cCapital}`;
	var countryRegion = document.createElement('div');
	countryRegion.setAttribute('class', 'card-text');
	countryRegion.innerText = `Region: ${region}`;
	var countryCode = document.createElement('div');
	countryCode.setAttribute('class', 'card-text');
	countryCode.innerText = `Country Code: ${cCode}`;
	var weatherButton = document.createElement('div');
	weatherButton.setAttribute('class', 'text-center');

	var btn = document.createElement('button');
	btn.setAttribute('class', 'btn btn-bg');
	btn.setAttribute('id', cCode);
	btn.setAttribute('data-toggle', 'modal');
	btn.setAttribute('data-target', '#weatherPopup');
	btn.setAttribute('onclick', 'getWeatherData(this.id)');
	btn.innerText = "Click for Weather";
	weatherButton.append(btn);

	countryBody.append(capital);
	countryBody.append(countryRegion);
	countryBody.append(countryCode);
	countryBody.append(weatherButton);

	card.append(countryBody);

	return card;
}

function fetchData(url) {
	var restCountryPromise = fetch(url)
		.then(function (data) {
			return data.json();
		})
		.catch(function (error) {
			console.log(error);
		});
	return restCountryPromise;
}

function createRestCountryElements(promiseObj) {
	Promise.all([promiseObj])
		.then(function (data) {
			data[0].forEach(function (country, index) {
				document.getElementById(`col${index % 3}`).append(createCard(country));
			});
		})
		.catch(function (error) {
			console.log(error);
		});
}

function getWeatherData(cCode) {
	var cName = document.getElementById(cCode + "-name").innerText;
	var cCapital = document.getElementById(cCode + "-capital").innerText.substr(9);
	var openWeatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cCapital},${cCode}&units=metric&appid=acfb3d99930f75c0dfb1860991f3f2cc`;
	var weatherPromise = fetchData(openWeatherApiUrl);
	document.getElementById("country-name").innerText = cName;
	document.getElementById("country-temp").innerText = "Temperature: Loading Data...";
	Promise.all([weatherPromise])
		.then(function (data) {
			document.getElementById("country-temp").innerText = `Temperature: ${data[0].main.temp} °C`;
		})
		.catch(function (error) {
			console.log(error);
		});
}

createRestCountryElements(fetchData(restCountryApiUrl));