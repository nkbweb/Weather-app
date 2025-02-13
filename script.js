// Hide popup when user clicks anywhere on the screen
document.addEventListener('click', () => {
  const popupOverlay = document.getElementById('popupOverlay');
  if (popupOverlay) {
    popupOverlay.style.display = 'none';
  }
}, { once: true }); // "once: true" ensures it closes on the first click



// Toggle Menu
menuIcon.addEventListener('click', (event) => {
  navLinks.classList.toggle('active');
  menuIcon.innerHTML = navLinks.classList.contains('active') ? '✕' : '☰';
  event.stopPropagation(); // Prevent immediate closing when clicking the icon
});

// Close Menu When Clicking Outside
document.addEventListener('click', (event) => {
  if (!navLinks.contains(event.target) && event.target !== menuIcon) {
    navLinks.classList.remove('active');
    menuIcon.innerHTML = '☰';
  }
});

// Close Menu When Clicking on a Link
const navLinkItems = document.querySelectorAll('.nav-links li a');
navLinkItems.forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    menuIcon.innerHTML = '☰';
  });
});




// Show dropdown on focus
function showDropdown() {
  const dropdown = document.getElementById('cityDropdown');
  dropdown.style.display = 'block';
}

// Hide dropdown on typing
function handleTyping() {
  const input = document.getElementById('cityInput');
  const dropdown = document.getElementById('cityDropdown');

  // Hide only if user starts typing and input has value
  if (input.value.trim() !== "") {
    dropdown.style.display = 'none';
  }
}

// Select city from dropdown
function selectCity(city) {
  const input = document.getElementById('cityInput');
  input.value = city;
  handleTyping(); // Hide dropdown after selecting
}

// Hide dropdown when clicking outside (excluding search box and dropdown)
document.addEventListener('click', function(event) {
  const searchSection = document.querySelector('.search-section');
  const dropdown = document.getElementById('cityDropdown');

  if (!searchSection.contains(event.target)) {
    dropdown.style.display = 'none';
  }
});



const apiKey = 'fd6340676db06c79ed9cfb3691e376ae'; // Your API key

// Function to fetch and display weather data
function fetchWeatherData(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

  // Fetch today's weather
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      const todayIcon = document.getElementById('todayIcon');
      const todayTemp = document.getElementById('todayTemp');
      const todayLocation = document.getElementById('todayLocation');
      const locationMap = document.getElementById('locationMap');

      // Update today's weather
      todayIcon.className = getWeatherIcon(data.weather[0].main);
      todayTemp.textContent = `${Math.round(data.main.temp)}°C`;
      todayLocation.textContent = `${data.name}, ${data.sys.country}`;

      // Update the map with the new location
      const lat = data.coord.lat;
      const lon = data.coord.lon;
      locationMap.src = `https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d15057.534307180755!2d${lon}!3d${lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1691234567890!5m2!1sen!2sin`;
    })
    .catch((error) => console.error('Error fetching today\'s weather:', error));

  // Fetch 5-day forecast
  fetch(forecastUrl)
    .then((response) => response.json())
    .then((data) => {
      const forecastList = document.getElementById('forecastList');
      forecastList.innerHTML = ''; // Clear previous forecast data
      const forecasts = data.list.filter((item, index) => index % 8 === 0); // Get one forecast per day

      forecasts.forEach((forecast) => {
        const date = new Date(forecast.dt * 1000);
        const day = date.toLocaleDateString('en-US', { weekday: 'short' });
        const icon = getWeatherIcon(forecast.weather[0].main);
        const tempRange = `${Math.round(forecast.main.temp_min)}°C / ${Math.round(forecast.main.temp_max)}°C`;

        const forecastItem = document.createElement('div');
        forecastItem.className = 'forecast-item';
        forecastItem.innerHTML = `
          <p class="day">${day}</p>
          <i class="${icon}"></i>
          <p class="temp-range">${tempRange}</p>
        `;
        forecastList.appendChild(forecastItem);
      });
    })
    .catch((error) => console.error('Error fetching forecast:', error));
}

// Helper function to get weather icon
function getWeatherIcon(weatherCondition) {
  switch (weatherCondition.toLowerCase()) {
    case 'clear':
      return 'ri-sun-fill'; // Clear sky
    case 'clouds':
      return 'ri-cloudy-fill'; // Cloudy
    case 'rain':
      return 'ri-rainy-fill'; // Rain
    case 'drizzle':
      return 'ri-drizzle-fill'; // Drizzle
    case 'thunderstorm':
      return 'ri-thunderstorms-fill'; // Thunderstorm
    case 'snow':
      return 'ri-snowy-fill'; // Snow
    case 'mist':
    case 'haze':
    case 'fog':
      return 'ri-mist-fill'; // Mist, Haze, Fog
    case 'smoke':
      return 'ri-smoke-fill'; // Smoke
    case 'dust':
    case 'sand':
      return 'ri-dust-fill'; // Dust or Sand
    case 'ash':
      return 'ri-volcano-fill'; // Volcanic Ash
    case 'squall':
      return 'ri-windy-fill'; // Squall
    case 'tornado':
      return 'ri-tornado-fill'; // Tornado
    default:
      return 'ri-question-fill'; // Fallback for unknown conditions
  }
}

// Add event listener to the search button
document.getElementById('searchButton').addEventListener('click', () => {
  const cityInput = document.getElementById('cityInput').value.trim();
  if (cityInput) {
    fetchWeatherData(cityInput);
  } else {
    alert('Please enter a city name.');
  }
});

// Optional: Fetch default weather data for Jammu on page load
fetchWeatherData('Jammu');

// Add event listener to the search button
document.getElementById('searchButton').addEventListener('click', () => {
  const cityInput = document.getElementById('cityInput').value.trim();
  if (cityInput) {
    fetchWeatherData(cityInput);
  } else {
    alert('Please enter a city name.');
  }
});

// Optional: Fetch default weather data for Jammu on page load
fetchWeatherData('Jammu');





// Function to fetch and display additional weather data (Wind, Air Quality, Sunrise/Sunset)
function fetchAdditionalWeatherData(lat, lon) {
  const airQualityUrl = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;

  // Fetch Air Quality Data
  fetch(airQualityUrl)
    .then((response) => response.json())
    .then((airData) => {
      const airQualityIndex = document.getElementById('airQualityIndex');
      const airQualityLevel = document.getElementById('airQualityLevel');
      const aqi = airData.list[0].main.aqi;

      airQualityIndex.textContent = aqi;
      airQualityLevel.textContent = getAirQualityLevel(aqi);
    })
    .catch((error) => console.error('Error fetching air quality data:', error));
}

// Helper function to get air quality level
function getAirQualityLevel(aqi) {
  switch (aqi) {
    case 1:
      return 'Good';
    case 2:
      return 'Fair';
    case 3:
      return 'Moderate';
    case 4:
      return 'Poor';
    case 5:
      return 'Very Poor';
    default:
      return 'Unknown';
  }
}

// Update Wind, Air Quality, and Sunrise/Sunset data
function updateAdditionalWeatherData(data) {
  const windSpeed = document.getElementById('windSpeed');
  const windDirection = document.getElementById('windDirection');
  const sunriseTime = document.getElementById('sunriseTime');
  const sunsetTime = document.getElementById('sunsetTime');

  // Update Wind Speed and Direction
  windSpeed.textContent = `${data.wind.speed} m/s`;
  windDirection.textContent = `${data.wind.deg}°`;

  // Update Sunrise and Sunset Times
  sunriseTime.textContent = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
  sunsetTime.textContent = new Date(data.sys.sunset * 1000).toLocaleTimeString();
}

// Modify fetchWeatherData to include additional data
function fetchWeatherData(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

  // Fetch today's weather
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      const todayIcon = document.getElementById('todayIcon');
      const todayTemp = document.getElementById('todayTemp');
      const todayLocation = document.getElementById('todayLocation');
      const locationMap = document.getElementById('locationMap');

      // Update today's weather
      todayIcon.className = getWeatherIcon(data.weather[0].main);
      todayTemp.textContent = `${Math.round(data.main.temp)}°C`;
      todayLocation.textContent = `${data.name}, ${data.sys.country}`;

      // Update the map with the new location
      const lat = data.coord.lat;
      const lon = data.coord.lon;
      locationMap.src = `https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d15057.534307180755!2d${lon}!3d${lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1691234567890!5m2!1sen!2sin`;

      // Update Wind, Air Quality, and Sunrise/Sunset data
      updateAdditionalWeatherData(data);
      fetchAdditionalWeatherData(lat, lon);
    })
    .catch((error) => console.error('Error fetching today\'s weather:', error));

  // Fetch 5-day forecast
  fetch(forecastUrl)
    .then((response) => response.json())
    .then((data) => {
      const forecastList = document.getElementById('forecastList');
      forecastList.innerHTML = ''; // Clear previous forecast data
      const forecasts = data.list.filter((item, index) => index % 8 === 0); // Get one forecast per day

      forecasts.forEach((forecast) => {
        const date = new Date(forecast.dt * 1000);
        const day = date.toLocaleDateString('en-US', { weekday: 'short' });
        const icon = getWeatherIcon(forecast.weather[0].main);
        const tempRange = `${Math.round(forecast.main.temp_min)}°C / ${Math.round(forecast.main.temp_max)}°C`;

        const forecastItem = document.createElement('div');
        forecastItem.className = 'forecast-item';
        forecastItem.innerHTML = `
          <p class="day">${day}</p>
          <i class="${icon}"></i>
          <p class="temp-range">${tempRange}</p>
        `;
        forecastList.appendChild(forecastItem);
      });
    })
    .catch((error) => console.error('Error fetching forecast:', error));
}