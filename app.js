async function getWeather() {
    const city = document.getElementById("cityInput").value;
    const resultDiv = document.getElementById("weatherResult");

    if (city === "") {
        resultDiv.innerHTML = "Paris";
        return;
    }

    const apiKey = "54f0114990821039b970ca41077c4284"; // 🔥 Paste your API key here
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();

        const temperature = data.main.temp;
        const description = data.weather[0].description;
        const humidity = data.main.humidity;
        const windSpeed = data.wind.speed;

        resultDiv.innerHTML = `
            <h3>${data.name}</h3>
            <p>🌡 Temperature: ${temperature} °C</p>
            <p>☁ Weather: ${description}</p>
            <p>💧 Humidity: ${humidity}%</p>
            <p>🌬 Wind Speed: ${windSpeed} m/s</p>
        `;
    } catch (error) {
        resultDiv.innerHTML = "Error: " + error.message;
    }
}