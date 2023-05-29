import React from "react";
import "./WeatherComponent.css";

export default function WeatherComponent({ tripDestination, weather }) {
  return (
    <article className="trip-component">
      <table className="weather-table">
        <caption>Weather In: {tripDestination}</caption>
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
        <tbody>{weather}</tbody>
      </table>
    </article>
  );
}
