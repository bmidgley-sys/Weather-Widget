const apiKey = "b6e6c6e31f0e276362c3d7d7d6326988";

const themeStylesheet = document.getElementById("themeStylesheet");
const switchThemeBtn = document.getElementById("switchThemeBtn");

const themes = ["light.css", "dark.css", "balanced.css"];
let currentThemeIndex = 0;

if (switchThemeBtn) {
    switchThemeBtn.addEventListener("click", () => {
        currentThemeIndex = (currentThemeIndex + 1) % themes.length;
        themeStylesheet.href = themes[currentThemeIndex];
        localStorage.setItem("themeIndex", currentThemeIndex);
    });

    const savedIndex = localStorage.getItem("themeIndex");
    if (savedIndex !== null) {
        currentThemeIndex = parseInt(savedIndex);
        themeStylesheet.href = themes[currentThemeIndex];
    }
}

const getWeatherBtn = document.getElementById("getWeatherBtn");
if (getWeatherBtn) {
    getWeatherBtn.addEventListener("click", async () => {
        const city = document.getElementById("cityInput").value;
        if (!city) return;

        localStorage.setItem("lastCity", city);

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
        const response = await fetch(url);
        const data = await response.json();

        const todayDiv = document.getElementById("todayWeather");
        todayDiv.innerHTML = `
            <h2>${data.name}</h2>
            <p>${data.weather[0].description}</p>
            <p>Temp: ${data.main.temp}°F</p>
            <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="weather icon">
        `;
    });

    const lastCity = localStorage.getItem("lastCity");
    if (lastCity) {
        document.getElementById("cityInput").value = lastCity;
        getWeatherBtn.click();
    }
}

const getForecastBtn = document.getElementById("getForecastBtn");
if (getForecastBtn) {
    getForecastBtn.addEventListener("click", async () => {
        const city = document.getElementById("cityInput").value;
        if (!city) return;

        localStorage.setItem("lastCity", city);

        const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`;
        const response = await fetch(url);
        const data = await response.json();

        const forecastDiv = document.getElementById("forecastWeather");
        forecastDiv.innerHTML = "";

        const daily = data.list.filter(item => item.dt_txt.includes("12:00:00"));
        daily.forEach(day => {
            const card = document.createElement("div");
            card.className = "weather-card";
            card.innerHTML = `
                <h3>${new Date(day.dt_txt).toLocaleDateString()}</h3>
                <p>${day.weather[0].description}</p>
                <p>Temp: ${day.main.temp}°F</p>
                <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather icon">
            `;
            forecastDiv.appendChild(card);
        });
    });

    const lastCity = localStorage.getItem("lastCity");
    if (lastCity) {
        document.getElementById("cityInput").value = lastCity;
        getForecastBtn.click();
    }
}