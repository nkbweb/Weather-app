document.getElementById('search-btn').addEventListener('click', getWeather);
document.getElementById('city-input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        getWeather();
    }
});

function getWeather() {
    const city = document.getElementById('city-input').value;
    const apiKey = 'fd6340676db06c79ed9cfb3691e376ae'; // Your API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(data => {
            document.getElementById('weather-info').classList.remove('hidden');
            document.getElementById('error-message').classList.add('hidden');

            const temperature = Math.round(data.main.temp);
            const humidity = data.main.humidity;
            const windSpeed = data.wind.speed;
            const weatherIcon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`; // Better icon resolution

            document.getElementById('temperature').innerText = `${temperature}°C`;
            document.getElementById('city-name').innerText = data.name;
            document.getElementById('humidity').innerText = humidity;
            document.getElementById('wind-speed').innerText = windSpeed;
            document.getElementById('weather-icon').src = weatherIcon;
        })
        .catch(error => {
            document.getElementById('weather-info').classList.add('hidden');
            document.getElementById('error-message').innerText = error.message;
            document.getElementById('error-message').classList.remove('hidden');
        });
}
