const BASE_URL = "https://api.openweathermap.org/data/2.5";

function getApiKey() {
  const apiKey = import.meta.env.VITE_API_KEY;

  if (!apiKey) {
    throw new Error("API key não configurada");
  }

  return apiKey;
}

export async function getWeather(city) {
  const apiKey = getApiKey();
  const response = await fetch(
    `${BASE_URL}/weather?q=${city}&appid=${apiKey}&units=metric&lang=pt_br`
  );

  if (!response.ok) {
    throw new Error("Cidade não encontrada");
  }

  return response.json();
}

export async function getForecast(city) {
  const apiKey = getApiKey();
  const response = await fetch(
    `${BASE_URL}/forecast?q=${city}&appid=${apiKey}&units=metric&lang=pt_br`
  );

  if (!response.ok) {
    throw new Error("Previsão não encontrada");
  }

  return response.json();
}
