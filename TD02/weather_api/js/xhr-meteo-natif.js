

/**
 * @param {string} urlSend URL or road API
 * @param {function} success function call in success
 * @return init page
 */
function sendXhr(urlSend, success) {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", urlSend);
    xhr.responseType = 'json';

    xhr.addEventListener('load', (response) => {
        console.log(response);
        success(response.target.response)
    });
    xhr.addEventListener('error', (response) => {
        console.log("error", response);
    })
    xhr.send();
}

/**
* Send un request XHR with a Promise
* @param {string} urlSend URL or path API
* @return {XMLHttpRequest} 
*/
function sendXhrPromise(urlSend) {
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', urlSend);
        xhr.responseType = 'json';
        xhr.send();
        xhr.addEventListener('load', function (reponse) { resolve(reponse.target.response) });
        xhr.addEventListener('error', function (reponse) { reject(reponse) });
    });
}

/**
* Show weather data to city
* @param {json} data response API format json
* @return none
*/
function showWeatherData(data) {
	let weatherData = "";
	weatherData += `<h1>Meteo ${data.name} </h1>`;
	weatherData += `<p>Tendance : ${data.weather[0].description}</p>`;
	weatherData += `<p>Temperature : ${data.main.temp} °C</p>`;
	weatherData += `<p>Pression : ${data.main.pressure}</p>`;
	weatherData += `<p>Humidite : ${data.main.humidity}%</p>`;
	document.querySelector('#weather').innerHTML = weatherData;
}

// -------------------- main

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');
    let apiKey = "e4bd4913b4726a3afe32989704cafd6c";
    let city = "Nancy, fr";
    let options = "units=metric&lang=fr";
    let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${apiKey}&${options}`;

    console.log('API URL : ', weatherUrl);
    // sendXhr(weatherUrl, showWeatherData);

    sendXhrPromise(weatherUrl)
    .then(data => showWeatherData(data))
    .catch(error => {
        let errorMessage = "<p>API openweathermap is not available</p>";
        console.log(errorMessage);
        document.querySelector('#weather').innerHTML = errorMessage;
    });
});