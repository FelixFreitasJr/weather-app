export async function getWeather(city) {
  const apiKey = import.meta.env.VITE_API_KEY;

  if (!apiKey) {
    throw new Error("API key não configurada");
  }

  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=pt_br`
  );

  if (!response.ok) {
    throw new Error("Cidade não encontrada");
  }

  return await response.json();
}