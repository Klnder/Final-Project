require("dotenv").config();
const axios = require("axios");

async function getWeatherForecast(request, response) {
  if (request.query.city && request.query.date) {
    let city = request.query.city;
    let date = request.query.date;

    const forecastDay = new Date(date);
    const currentDate = new Date();
    const oneDay = 24 * 60 * 60 * 1000;
    const inDays = Math.round(Math.abs((forecastDay - currentDate) / oneDay));

    if (inDays <= 14) {
      try {
        let API = `https://api.weatherapi.com/v1/forecast.json?key=${process.env.WEATHER_API_KEY}&q=${city}&days=14&aqi=no&alerts=no`;
        let res = await axios.get(API);
        let forecastData = res.data.forecast.forecastday[inDays];
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
    } else {
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
  } else {
    response.status(500).json("Please enter a city and a date");
  }
}

module.exports = getWeatherForecast;
