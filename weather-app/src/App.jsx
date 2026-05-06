import { useState } from "react";
import { getForecast, getWeather } from "./services/api";
import "./App.css";

function groupForecastByDay(forecastList = []) {
  const groupedDays = forecastList.reduce((acc, item) => {
    const date = item.dt_txt.split(" ")[0];

    if (!acc[date]) {
      acc[date] = [];
    }

    acc[date].push(item);
    return acc;
  }, {});

  return Object.entries(groupedDays)
    .slice(0, 5)
    .map(([date, items]) => {
      const temps = items.map((entry) => entry.main.temp);
      const min = Math.min(...temps);
      const max = Math.max(...temps);
      const middleItem = items[Math.floor(items.length / 2)];

      return {
        date,
        min,
        max,
        icon: middleItem.weather[0].icon,
        description: middleItem.weather[0].description,
      };
    });
}

function formatDate(date) {
  return new Intl.DateTimeFormat("pt-BR", {
    weekday: "short",
    day: "2-digit",
    month: "2-digit",
  }).format(new Date(date));
}

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSearch() {
    if (!city) return;

    setLoading(true);
    setError("");
    setWeather(null);
    setForecast([]);

    try {
      const [weatherData, forecastData] = await Promise.all([
        getWeather(city),
        getForecast(city),
      ]);

      setWeather(weatherData);
      setForecast(groupForecastByDay(forecastData.list));
    } catch {
      setError("Não encontramos essa cidade. Verifique o nome e tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container">
      <div className="card">
        <h1>🌦️ Weather App</h1>

        <input
          className="input"
          type="text"
          placeholder="Digite a cidade"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />

        <button className="button" onClick={handleSearch}>
          {loading ? "Buscando..." : "Buscar"}
        </button>

        {error && <p className="error">{error}</p>}

        {weather && (
          <div className="result">
            <h2>{weather.name}</h2>

            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={`Ícone de ${weather.weather[0].description}`}
            />

            <p className="temp">{Math.round(weather.main.temp)}°C</p>
            <p>{weather.weather[0].description}</p>
            <p className="min-max">
              Máx: {Math.round(weather.main.temp_max)}°C • Mín: {Math.round(weather.main.temp_min)}°C
            </p>
          </div>
        )}

        {forecast.length > 0 && (
          <div className="forecast">
            <h3>Próximos dias</h3>
            <div className="forecast-list">
              {forecast.map((day) => (
                <div className="forecast-item" key={day.date}>
                  <p>{formatDate(day.date)}</p>
                  <img
                    src={`https://openweathermap.org/img/wn/${day.icon}.png`}
                    alt={`Ícone de ${day.description}`}
                  />
                  <p>
                    {Math.round(day.max)}°C / {Math.round(day.min)}°C
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
