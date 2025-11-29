const apiKey = "4493e812849d7f5bab780e9a95bb9de5";

const cities = [
  "Addis Ababa",
  "Harar",
  "Bahir Dar",
  "Bale Robe",
  "Adama",
  "Dire Dawa",
  "Gondar",
  "Mekelle",
  "Jimma",
  "Hawassa",
  "Asosa",
  "Debre Berhan",
  "Debre Markos",
  "Dessie",
  "Shashemene",
  "Axum",
  "Jijiga",
  "Hosanna",
  "Arba Minch",
  "Nekemte",
  "Haramaya",
  "Maya" 
];

const cityList = document.getElementById("city-list");

async function fetchWeather(city) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city},ET&units=metric&appid=${apiKey}`
    );
    const data = await response.json();

    const weatherMain = data.weather[0].main.toLowerCase();
    const temp = Math.round(data.main.temp);

    let iconClass = "sunny";
    if (weatherMain.includes("rain")) iconClass = "rainy";
    else if (weatherMain.includes("cloud")) iconClass = "cloudy";

    const card = document.createElement("div");
    card.className = "city-card";

    card.innerHTML = `
      <h2>${city}</h2>
      <p class="temperature">${temp}°C</p>
      <p class="description">${weatherMain.charAt(0).toUpperCase() + weatherMain.slice(1)}</p>
      <div class="weather-icon ${iconClass}"></div>
    `;

    cityList.appendChild(card);
  } catch (err) {
    console.error(`Failed to fetch weather for ${city}:`, err);
  }
}

// Fetch weather for all cities
cities.forEach(city => fetchWeather(city));
