import React from "react";

export default function DailyWeather({ data }) {
  return (
    <tr>
      <td>{data.date}</td>
      <td>
        <img src={data.icon} alt="icon weather" className="icon-weather" title={data.description} />
      </td>
      <td>{data.mintemp}</td>
      <td>{data.maxtemp}</td>
      <td>{data.avgtemp}</td>
      <td>{data.avghumidity}</td>
    </tr>
  );
}
