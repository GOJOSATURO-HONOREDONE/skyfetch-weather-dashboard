// =======================
// WeatherApp Constructor
// =======================
function WeatherApp(apiKey) {
    this.apiKey = apiKey;
    this.baseURL = "https://api.openweathermap.org/data/2.5/";
    this.currentWeatherContainer = document.getElementById("current-weather");
    this.forecastContainer = document.getElementById("forecast-cards");
}

// Fetch current weather
WeatherApp.prototype.fetchCurrentWeather = function(city) {
    const url = `${this.baseURL}weather?q=${city}&units=metric&appid=${this.apiKey}`;
    return fetch(url).then(res => res.json());
};

// Fetch 5-day forecast
WeatherApp.prototype.fetchForecast = function(city) {
    const url = `${this.baseURL}forecast?q=${city}&units=metric&appid=${this.apiKey}`;
    return fetch(url).then(res => res.json());
};

// Render current weather
WeatherApp.prototype.renderCurrentWeather = function(data) {
    if (!data || data.cod !== 200) {
        this.currentWeatherContainer.innerHTML = "<p>Current weather not available</p>";
        return;
    }
    this.currentWeatherContainer.innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="icon">
        <p>${data.weather[0].description}</p>
        <p>Temp: ${data.main.temp}°C</p>
        <p>Humidity: ${data.main.humidity}%</p>
    `;
};

// Render 5-day forecast
WeatherApp.prototype.renderForecast = function(data) {
    if (!data || data.cod !== "200") {
        this.forecastContainer.innerHTML = "<p>Forecast not available</p>";
        return;
    }

    this.forecastContainer.innerHTML = "";

    const dailyForecast = data.list.filter(item => item.dt_txt.includes("12:00:00"));

    dailyForecast.forEach(item => {
        const card = document.createElement("div");
        card.className = "forecast-card";

        const date = new Date(item.dt_txt);
        const day = date.toLocaleDateString("en-US", { weekday: "short" });

        card.innerHTML = `
            <h3>${day}</h3>
            <img src="https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png" alt="icon">
            <p>${item.weather[0].description}</p>
            <p>${item.main.temp}°C</p>
        `;

        this.forecastContainer.appendChild(card);
    });
};

// Fetch and render both current weather + forecast
WeatherApp.prototype.fetchAndRenderAll = function(city) {
    Promise.all([
        this.fetchCurrentWeather(city),
        this.fetchForecast(city)
    ])
    .then(([currentData, forecastData]) => {
        this.renderCurrentWeather(currentData);
        this.renderForecast(forecastData);
    })
    .catch(err => console.error("Error fetching weather data:", err));
};

// =======================
// Usage
// =======================
const app = new WeatherApp("YOUR_API_KEY_HERE");

document.getElementById("search-form").addEventListener("submit", function(e) {
    e.preventDefault();
    const city = document.getElementById("city-input").value.trim();
    if (city) {
        app.fetchAndRenderAll(city);
    }
});