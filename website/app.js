console.log("hello from client");
const key = "32b6a2ee070c7c484e548f4e1c52f071";
let city = "";
let zip = "";

const weatherForm = document.querySelector("#weather-form");
let inputCityValue = document.querySelector("#city");
let inputZipValue = document.querySelector("#zip");
const weatherList = document.querySelector("#show-weather-data");
const buttonSubmit = document.querySelector(".btn-submit");

async function getWeather(WeUrl) {
  await fetch(WeUrl).then((res) => {
    res.json().then((data) => {
      const date = new Date();

      weatherList.innerHTML += `<li>Name: ${data.name}<button class="btn-close">x</button></li>`;
      weatherList.innerHTML += `<li>Date: ${date}<button class="btn-close">x</button></li>`;
      for (ele in data.main) {
        weatherList.innerHTML += `<li>${ele}: ${data.main[ele]}<button class="btn-close">x</button></li>`;

        // console.log(ele);
        // console.log(data.main[ele]);
      }

      for (ele in data.clouds) {
        weatherList.innerHTML += `<li>cloud: ${data.clouds[ele]}<button class="btn-close">x</button></li>`;
      }

      const currWeather = data.weather[0];
      weatherList.innerHTML += `<li>Weather Description: ${currWeather.description}<button class="btn-close">x</button></li>`;
      weatherList.innerHTML += `<li>Wind Speed: ${data.wind.speed}meter/sec<button class="btn-close">x</button></li>`;
      weatherList.innerHTML += `<li>Wind deg: ${data.wind.deg}degrees<button class="btn-close">x</button></li>`;

      console.log(data);
    });
  });
}
weatherList.addEventListener("click", (e) => {
  if (e.target.tagName == "BUTTON") {
    e.target.parentElement.style = "display: none";
  } else {
    console.log(e);
  }
});

buttonSubmit.addEventListener("click", (e) => {
  e.preventDefault();
  weatherList.innerHTML = "";
  if (inputCityValue.value) {
    city = inputCityValue.value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`;
    inputCityValue.value = "";
    getWeather(url);
  } else if (inputZipValue.value) {
    zip = inputZipValue.value;
    const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=${key}`;
    inputZipValue.value = "";
    getWeather(url);
  }
});
