import axios from "axios";
import React, { useEffect, useState } from "react";
import DailyWeather from "./DailyWeather";
import "./WeatherComponent.css";

export default function WeatherComponent({ trip }) {
  const [forecastTrip, setForecastTrip] = useState("");
  const [showElement, setShowElement] = useState(false);
  const [weatherTable, setWeatherTable] = useState("");

  useEffect(() => {
    getForecast();
  }, []);

  async function getForecast() {
    let forecastArray = [];

    try {
      var date = new Date(trip.startDate);
      for (let i = 0; i < 7; i++) {
        const yyyy = date.getFullYear();
        let mm = date.getMonth() + 1; // Months start at 0!
        let dd = date.getDate();
        if (dd < 10) dd = "0" + dd;
        if (mm < 10) mm = "0" + mm;
        const formattedDate = yyyy + "-" + mm + "-" + dd;
        let APIForecast = `${process.env.REACT_APP_API_ADDRESS}/weatherforecast?city=${trip.destination}&date=${formattedDate}`;
        let res = await axios.get(APIForecast);
        forecastArray.push(res.data);

        date.setDate(date.getDate() + 1);
      }
      setForecastTrip(forecastArray);

      let tableForecast = forecastArray.map((data, index) => {
        return <DailyWeather data={data} key={index} />;
      });
      setWeatherTable(tableForecast);
      setShowElement(true);
      // }
    } catch (error) {}
  }
  return (
    <article className="trip-component">
      {showElement && (
        <table className="weather-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Forecast</th>
              <th>Min °C</th>
              <th>Max °C</th>
              <th>Average °C</th>
              <th>Average Humidity</th>
            </tr>
          </thead>
          <tbody>{weatherTable}</tbody>
        </table>
      )}
    </article>
  );
}
