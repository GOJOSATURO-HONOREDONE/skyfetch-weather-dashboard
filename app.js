const apiKey = "54f0114990821039b970ca41077c4284";

const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");

searchBtn.addEventListener("click", () => {
    const city = cityInput.value;
    getWeather(city);
});

function getWeather(city) {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        .then(response => {

            const data = response.data;

            document.getElementById("city").innerText = data.name;
            document.getElementById("temperature").innerText = data.main.temp + "°C";
            document.getElementById("description").innerText = data.weather[0].description;

            const iconCode = data.weather[0].icon;
            document.getElementById("icon").src =
                `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

        })
        .catch(error => {
            alert("City not found!");
        });
}
