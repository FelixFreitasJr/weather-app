import { useState } from "react";
import { getWeather } from "./services/api";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSearch() {
    if (!city) return;

    setLoading(true);
    setError("");
    setWeather(null);

    try {
      const data = await getWeather(city);
      setWeather(data);
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
              alt="icone clima"
            />

            <p className="temp">{Math.round(weather.main.temp)}°C</p>
            <p>{weather.weather[0].description}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
