document.addEventListener("DOMContentLoaded", function () {
  const apiKey = "72e5997b795c1257f6de50cbac1ede40";
  const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

  var searchBox = document.getElementById("input");
  var searchBtn = document.getElementById("btn");
  var messageDiv = document.getElementById("message");

  // Set the initial value of the input field
  searchBox.value = "Phnom Penh";

  async function checkWeather(city) {
      const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
      const data = await response.json();

      console.log(data);

      if (response.status === 200) {
          // Check if 'main' property and 'temp' property exist
          if (data.main && data.main.temp !== undefined) {
              document.querySelector(".city").innerHTML = data.name;
              document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
              document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
              document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";
              messageDiv.innerHTML = ""; // Clear any previous error message
          } else {
              // Handle the case where the expected properties are not present
              messageDiv.innerHTML = "Invalid data format received from the API.";
          }
      } else if (response.status === 404) {
          // Handle the case where the city is not found
          messageDiv.innerHTML = "City not found. Please enter a valid city name.";
      } else {
          // Handle other API errors
          messageDiv.innerHTML = "An error occurred while fetching weather data.";
      }
  }

  // Set an initial value and trigger a search on page load
  checkWeather(searchBox.value);

  searchBtn.addEventListener("click", function () {
      checkWeather(searchBox.value);
  });
});