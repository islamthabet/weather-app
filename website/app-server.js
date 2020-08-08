let outData = {};
const getWeatherFromServer = async function (WeUrl) {
  await fetch(WeUrl).then((res) => {
    res.json().then((data) => {
      const date = new Date();
      outData = { name: data.name, date: date, temp: data.main.temp };
    });
  });
};

const postData = async (postUrl = "/data") => {
  const response = await fetch(postUrl, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(outData),
  });
  try {
    const newData = await response.json();
    console.log(newData);
    return newData;
  } catch (error) {
    console.log("error", error);
  }
};

const getData = async () => {
  await fetch("/data").then((res) => {
    return res.json().then((data) => {
      weatherList.innerHTML += `<li>Name: ${data.name}<button class="btn-close">x</button></li>`;
      weatherList.innerHTML += `<li>Date: ${data.date}<button class="btn-close">x</button></li>`;
      weatherList.innerHTML += `<li>Temp: ${data.temp}<button class="btn-close">x</button></li>`;
    });
  });
};

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  weatherList.innerHTML = "";

  if (inputCityValue.value) {
    city = inputCityValue.value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`;
    getWeatherFromServer(url);
    setTimeout(() => {
      postData("/data");
      getData();
    }, 2000);
    inputCityValue.value = "";
  } else if (inputZipValue.value) {
    zip = inputZipValue.value;
    const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=${key}`;
    getWeatherFromServer(url);
    setTimeout(() => {
      postData("/data");
      getData();
    }, 2000);
    inputZipValue.value = "";
  }
});
