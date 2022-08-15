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
if (hour < 10) {
  hour = `0${hour}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let date = document.querySelector("#date");
date.innerHTML = `${day} ${hour}:${minutes}`;

function showTemp(response) {
  celsiusTemp = Math.round(response.data.main.temp);
  let temperature = celsiusTemp;
  let wind = Math.round(response.data.wind.speed);
  let humidityData = Math.round(response.data.main.humidity);
  let humidity = document.querySelector("#humidity");
  let cityTemp = document.querySelector("#temperature");
  let windSpeed = document.querySelector("#wind-speed");
  let icon = document.querySelector("#icon-code");
  let description = document.querySelector("#description");

  windSpeed.innerHTML = `Wind: ${wind} km/h`;
  cityTemp.innerHTML = `${temperature}`;
  humidity.innerHTML = `Humidity: ${humidityData}%`;
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  description.innerHTML = response.data.weather[0].description;
}
function showCity(event) {
  event.preventDefault();
  let city = document.querySelector("#searching");
  let newCity = document.querySelector(".city");
  newCity.innerHTML = `${city.value}`;
  let apiKey = "cd891ee483e8a9a51b8fc31affc5f978";
  let unit = "metric";
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
  humidity.innerHTML = `Humidity: ${humidityData}%`;
  newCity.innerHTML = city;
  windSpeed.innerHTML = `Wind: ${wind} mph`;
}
function showPosition(position) {
  let longitude = position.coords.longitude;
  let latitude = position.coords.latitude;
  let apiKey = "cd891ee483e8a9a51b8fc31affc5f978";
  let unit = "metric";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?";
  let apiUrl = `${apiEndpoint}lat=${latitude}&lon=${longitude}&units=${unit}&appid=${apiKey}`;

  axios.get(apiUrl).then(showGeoTemp);
}
function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

function showFahrenheitTemp(event) {
  event.preventDefault();
  let fahrenheit = (celsiusTemp * 9) / 5 + 32;
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(fahrenheit);
}

function showCelsiusTemp(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = celsiusTemp;
}

let celsiusTemp = null;

let form = document.querySelector("#search-city-form");
form.addEventListener("submit", showCity);

let button = document.querySelector("#current-location");
button.addEventListener("click", getCurrentPosition);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemp);
