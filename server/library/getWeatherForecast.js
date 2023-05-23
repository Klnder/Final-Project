require("dotenv").config();
const axios = require("axios");

async function getWeatherForecast(request, response) {
  let city = request.query.city;
  let date = request.query.date;

  try {
    let API = `http://api.weatherapi.com/v1/future.json?key=${process.env.WEATHER_API_KEY}&q=${city}&dt=${date}`;
    let res = await axios.get(API);
    let forecastData = res.data.forecast.forecastday[0];
    let forecastWeather = {
      date: forecastData.date,
      maxtemp: forecastData.day.maxtemp_c,
      mintemp: forecastData.day.mintemp_c,
      avgtemp: forecastData.day.avgtemp_c,
      avghumidity: forecastData.day.avghumidity,
      conditiontext: forecastData.day.condition.text,
      icon: forecastData.day.condition.icon,
    };

    response.json(forecastWeather);
  } catch (error) {
    response.status(500).json("can't find the forecast for this day");
  }
}

module.exports = getWeatherForecast;
