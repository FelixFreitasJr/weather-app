export async function getWeather(city) {
  // const apiKey = import.meta.env.VITE_API_KEY;
  // TODO: mover API key para variável de ambiente antes do deploy
const apiKey = "6615e7076b26d2816962d95362760b29";

  // console.log("API KEY:", apiKey);

  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=pt_br`
  );

  if (!response.ok) {
    throw new Error("Cidade não encontrada");
  }

  return await response.json();
}