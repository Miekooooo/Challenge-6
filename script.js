document.addEventListener('DOMContentLoaded', () => {
    const apiKey = '6dd66ecb6bfa3fa3091d3d80bd866107';
    const citySearchForm = document.getElementById('citySearchForm');
    const currentWeather = document.getElementById('currentWeather');
    const cityName = document.getElementById('cityName');
    const date = document.getElementById('date');
    const weatherIcon= document.getElementById('currentWeather');
    const temperature = document.getElementById('temperature');
    const humidity = document.getElementById('humidity');
    const windSpeed = document.getElementById('windSpeed');
    const forecastContainer = document.getElementById('futureWeather');
    const searchHistory = document.getElementById('searchHistory');


  // Function to fetch weather data from the API
  async function fetchWeatherData(city) {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${'6dd66ecb6bfa3fa3091d3d80bd866107'}&units=metric`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching weather data:', error);
      return null;
    }
  }

  // Function to fetch 5-day forecast data from the API
  async function fetchForecastData(city) {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${'6dd66ecb6bfa3fa3091d3d80bd866107'}&units=metric`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching forecast data:', error);
      return null;
    }
  }

  // Function to update the UI with weather data
  function updateUI(data) {
    if (data) {
      cityName.textContent = data.name;
      date.textContent = new Date(data.dt * 1000).toLocaleDateString();
      weatherIcon.innerHTML = `<img src="http://openweathermap.org/img/w/${data.weather[0].icon}.png" alt="Weather Icon">`;
      temperature.textContent = `Temperature: ${data.main.temp}°C`;
      humidity.textContent = `Humidity: ${data.main.humidity}%`;
      windSpeed.textContent = `Wind Speed: ${data.wind.speed} m/s`;
    }
  }

  // Function to update the UI with forecast data
  function updateForecast(data) {
    if (data) {
      forecastContainer.innerHTML = ''; // Clear previous forecast data

      // Select every 8th item to get daily forecasts (3-hour intervals)
      const dailyForecasts = data.list.filter((item, index) => index % 8 === 0);

      dailyForecasts.forEach((forecast, index) => {
        const forecastDate = new Date(forecast.dt * 1000).toLocaleDateString();
        const forecastIcon = forecast.weather[0].icon;
        const forecastTemperature = forecast.main.temp;
        const forecastHumidity = forecast.main.humidity;
        const forecastWindSpeed = forecast.wind.speed;

        const forecastDay = document.createElement('div');
        forecastDay.classList.add('forecastDay');
        forecastDay.innerHTML = `
          <div class="forecastDate">${forecastDate}</div>
          <div class="forecastIcon"><img src="http://openweathermap.org/img/w/${forecastIcon}.png" alt="Weather Icon"></div>
          <div class="forecastTemperature">Temperature: ${forecastTemperature}°C</div>
          <div class="forecastHumidity">Humidity: ${forecastHumidity}%</div>
          <div class="forecastWindSpeed">Wind Speed: ${forecastWindSpeed} m/s</div>
        `;

        forecastContainer.appendChild(forecastDay);
      });
    }
  }

  /// Function to handle form submission
citySearchForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const city = citySearchForm.cityInput.value;

  // Fetch current weather data for the city
  const currentWeatherData = await fetchWeatherData(city);

  // Fetch 5-day forecast data for the city
  const forecastData = await fetchForecastData(city);

  // Update the UI with current weather data
  updateUI(currentWeatherData);

  // Update the UI with forecast data
  updateForecast(forecastData);

  // Add the city to the search history
  let isCityInHistory = false;
  for (const historyItem of searchHistory.querySelectorAll('li')) {
    if (historyItem.textContent === city) {
      isCityInHistory = true;
      break;
    }
  }

  if (city && !isCityInHistory) {
    const historyItem = document.createElement('li');
    historyItem.textContent = city;
    historyItem.addEventListener('click', async () => {
      // Handle click on search history item to show weather data
      const currentWeatherData = await fetchWeatherData(city);
      const forecastData = await fetchForecastData(city);
      updateUI(currentWeatherData);
      updateForecast(forecastData);
    });
    searchHistory.appendChild(historyItem);
  }

  // Clear the search input
  citySearchForm.reset();
  });
});





