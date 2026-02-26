const apiKey = "54f0114990821039b970ca41077c4284";

function getWeather() {
    const city = document.getElementById("cityInput").value.trim();
    if (!city) return;

    fetchWeather(city);
}

function getWeatherByCity(city) {
    document.getElementById("cityInput").value = city;
    fetchWeather(city);
}

function fetchWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod !== 200) {
                document.getElementById("weatherResult").innerHTML = "City not found!";
                return;
            }

            const weatherHTML = `
                <h2>${data.name}</h2>
                <p>🌡 Temperature: ${data.main.temp}°C</p>
                <p>🌥 Condition: ${data.weather[0].description}</p>
                <p>💨 Wind Speed: ${data.wind.speed} m/s</p>
            `;

            document.getElementById("weatherResult").innerHTML = weatherHTML;

            saveCity(city);
            displayRecentCities();
        })
        .catch(() => {
            document.getElementById("weatherResult").innerHTML = "Error fetching data!";
        });
}

/* =========================
   LOCAL STORAGE PART (Part 4)
========================= */

function saveCity(city) {
    let cities = JSON.parse(localStorage.getItem("recentCities")) || [];

    if (!cities.includes(city)) {
        cities.unshift(city);
    }

    if (cities.length > 5) {
        cities.pop();
    }

    localStorage.setItem("recentCities", JSON.stringify(cities));
    localStorage.setItem("lastCity", city);
}

function displayRecentCities() {
    let cities = JSON.parse(localStorage.getItem("recentCities")) || [];
    let container = document.getElementById("recentSearches");

    container.innerHTML = "";

    cities.forEach(city => {
        let button = document.createElement("button");
        button.innerText = city;
        button.onclick = () => getWeatherByCity(city);
        container.appendChild(button);
    });
}

/* Auto Load Last Searched City */
window.onload = function () {
    displayRecentCities();

    let lastCity = localStorage.getItem("lastCity");
    if (lastCity) {
        fetchWeather(lastCity);
    }
};
