// Install necessary packages: express, axios
// npm install express axios

const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

app.use(express.json());

app.post('/getWeather', async (req, res) => {
  try {
    const { cities } = req.body;
    const weatherData = await fetchWeather(cities);
    res.json({ weather: weatherData });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

async function fetchWeather(cities) {
  const weatherData = {};

  // Loop through each city and fetch real-time weather
  for (const city of cities) {
    const response = await axios.get(`https://api.weatherapi.com/v1/current.json?key=YOUR_API_KEY&q=${city}`);
    const temperature = response.data.current.temp_c;
    weatherData[city] = `${temperature}C`;
  }

  return weatherData;
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
