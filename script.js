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
    const futureWeather = document.getElementById('futureWeather');
    const searchHistory = document.getElementById('searchHistory');
});

// Function to fetch weather data from the API
async function fetchWeatherData(city) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${'6dd66ecb6bfa3fa3091d3d80bd866107'}`);
    const data = await response.json();
    return data;
  }
// Function to update the UI with weather data
  function updateUI(data) {
    cityName.textcontent = data.name;
    date.textContent = new Date().toLocaleDateString();
    weatherIcon.innerHTML = `<img src="http://openweathermap.org/img/w/${data.weather[0].icon}.png" alt="Weather Icon">`;
    temperature.textContent = `Temperature: ${data.main.temp}°C`;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;
    windSpeed.textContent = `Wind Speed: ${data.wind.speed} m/s`;
  }

//function to handle fourcast updates
function updateForecast(data) {
    //fetch forecast data here and update forecastContainer
}

//function to handle search form submission
citySearchForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const city = citySearchForm.cityInput.value;

    //Fetch weather data for the city
    const weatherData = await fetchWeatherData(city);

    //Update UI with current weather data
    updateUI(weatherData);

    //Add the city to search history
    const historyItem = document.createElement('li');
    historyItem.textContent = city;
    historyItem.addEventListener('click', async () => {
        const weatherData = await fetchWeatherData(city);
        updateUI(weatherData);
        updateForecast(weatherData);
    });
    searchHistory.appendChild(historyItem);

    //clear the search input
    citySearchForm.reset();
})
