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
  let temperature = Math.round(response.data.main.temp);
  let wind = Math.round(response.data.wind.speed);
  let humidityData = Math.round(response.data.main.humidity);
  let humidity = document.querySelector("#humidity");
  let cityTemp = document.querySelector("#temperature");
  let windSpeed = document.querySelector("#wind-speed");
  windSpeed.innerHTML = `Wind: ${wind} mph`;
  cityTemp.innerHTML = `${temperature}°c`;
  humidity.innerHTML = `Humidity: ${humidityData}%`;
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
  cityTemp.innerHTML = `${temperature}°c`;
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

let form = document.querySelector("#search-city-form");
form.addEventListener("submit", showCity);
let button = document.querySelector("#current-location");
button.addEventListener("click", getCurrentPosition);
