let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let now = new Date();
let day = days[now.getDay()];
let hour = now.getHours();
let morningEvening = hour >= 12 ? "pm" : "am";
hour = hour % 12;
hour = hour ? hour : 12;
if (hour < 10) {
  hour = `0${hour}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let date = document.querySelector("#date");
date.innerHTML = `${day} ${hour}:${minutes} ${morningEvening}`;

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let days = ["Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"];

  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="col-2">
            <div class="dates">${day}</div>
            <i class="fa-solid fa-cloud cloud weather-icon"></i>
            <div class="high-low">95°/77°</div>
          </div>`;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "cd891ee483e8a9a51b8fc31affc5f978";
  let apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&units=imperial&appid=${apikey}`;

  axios.get(apiUrl).then(displayForecast);
}

function showTemp(response) {
  fahrenheitTemp = Math.round(response.data.main.temp);
  let temperature = fahrenheitTemp;
  let wind = Math.round(response.data.wind.speed);
  let humidityData = Math.round(response.data.main.humidity);
  let humidity = document.querySelector("#humidity");
  let cityTemp = document.querySelector("#temperature");
  let windSpeed = document.querySelector("#wind-speed");
  let icon = document.querySelector("#icon-code");
  let description = document.querySelector("#description");

  windSpeed.innerHTML = `${wind} mph`;
  cityTemp.innerHTML = `${temperature}`;
  humidity.innerHTML = `${humidityData} %`;
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  description.innerHTML = response.data.weather[0].description;

  getForecast(response.data.coords);
}

function showCity(event) {
  event.preventDefault();
  let city = document.querySelector("#searching");
  let newCity = document.querySelector(".city");
  newCity.innerHTML = `${city.value}`;
  let apiKey = "cd891ee483e8a9a51b8fc31affc5f978";
  let unit = "imperial";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?q=";
  let apiUrl = `${apiEndpoint}${city.value}&units=${unit}&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemp);
}

function showGeoTemp(response) {
  let temperature = Math.round(response.data.main.temp);
  let wind = Math.round(response.data.wind.speed);
  let humidityData = Math.round(response.data.main.humidity);
  let city = response.data.name;
  let newCity = document.querySelector(".city");
  let humidity = document.querySelector("#humidity");
  let cityTemp = document.querySelector("#temperature");
  let windSpeed = document.querySelector("#wind-speed");

  cityTemp.innerHTML = `${temperature}`;
  humidity.innerHTML = humidityData;
  newCity.innerHTML = city;
  windSpeed.innerHTML = `Wind: ${wind} mph`;
}

function showPosition(position) {
  let longitude = position.coords.longitude;
  let latitude = position.coords.latitude;
  let apiKey = "cd891ee483e8a9a51b8fc31affc5f978";
  let unit = "imperial";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?";
  let apiUrl = `${apiEndpoint}lat=${latitude}&lon=${longitude}&units=${unit}&appid=${apiKey}`;

  axios.get(apiUrl).then(showGeoTemp);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

function showCelsiusTemp(event) {
  event.preventDefault();
  let celsius = ((fahrenheitTemp - 32) * 5) / 9;
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsius);
}

function showFahrenheitTemp(event) {
  event.preventDefault();
  fahrenheitLink.classList.add("active");
  celsiusLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = fahrenheitTemp;
}

let fahrenheitTemp = null;

let form = document.querySelector("#search-city-form");
form.addEventListener("submit", showCity);

let button = document.querySelector("#current-location");
button.addEventListener("click", getCurrentPosition);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemp);
