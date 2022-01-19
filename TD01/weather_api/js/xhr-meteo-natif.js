

/**
 * @param {string} urlSend URL ou root API
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
* Show weather data to city
* @param {json} data :  response API format json
* @return : none
*/
function showWeatherData(data) {

	console.log(data);
	let weatherData = "";
	weatherData += `<h3>Meteo a  ${data.name} </h3>`;
	weatherData += `<p>Tendance :  ${data.weather[0].description}`;
	weatherData += ` - Temperature : ${data.main.temp} °C</p>`;
	weatherData += `<p>Pression : ${data.main.pressure} hPa - Humidite ${data.main.humidity}%</p>`;
	document.querySelector('#meteo').innerHTML = weatherData;

}

// -------------------- main

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');
    let apiKey = "e4bd4913b4726a3afe32989704cafd6c";
    let city = "Nancy, fr";
    let options = "units=metric&lang=fr";
    let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${apiKey}&${options}`;

    console.log('API URL : ', weatherUrl);
    sendXhr(weatherUrl, showWeatherData);
});