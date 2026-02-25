function getWeather() {
    const city = document.getElementById("cityInput").value;
    document.getElementById("weatherResult").innerHTML =
        "Weather for " + city + " will appear here.";
}