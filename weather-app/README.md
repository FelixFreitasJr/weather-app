# 🌦️ Weather App

Aplicativo de clima feito com **React + Vite** usando a API da OpenWeather.

## Funcionalidades

- Busca de clima atual por cidade.
- Exibição de temperatura atual.
- Exibição de temperatura **máxima e mínima** do dia.
- Exibição de **ícone correspondente** às condições do tempo.
- Bloco com **previsão dos próximos dias** com ícone e faixa de temperatura.

## Como rodar o projeto

1. Instale as dependências:

```bash
npm install
```

2. Crie um arquivo `.env` na pasta `weather-app/` com sua chave da OpenWeather:

```env
VITE_API_KEY=sua_chave_aqui
```

3. Execute em desenvolvimento:

```bash
npm run dev
```

4. Build de produção:

```bash
npm run build
```

## API utilizada

- Clima atual: `https://api.openweathermap.org/data/2.5/weather`
- Previsão: `https://api.openweathermap.org/data/2.5/forecast`
