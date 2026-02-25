function getWeather() {
    const city = document.getElementById("cityInput").value;

    if (city === "") {
        document.getElementById("weatherResult").innerHTML =
            "Please enter a city name.";
        return;
    }

    document.getElementById("weatherResult").innerHTML =
        "Weather for <strong>" + city + "</strong> will appear here.";
}