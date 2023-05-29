import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TimeComponent from "../components/TimeComponent";
import WeatherComponent from "../components/WeatherComponent";
import axios from "axios";
import ReactLoading from "react-loading";
import "./ViewTrip.css";
import DailyWeather from "../components/DailyWeather";

export default function ViewTrip() {
  const params = useParams();
  const [trip, setTrip] = useState({});
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [weatherForecast, setWeatherForecast] = useState();
  const [showForecast, setShowForecast] = useState(false);
  const [fromTimezone, setFromTimezone] = useState();
  const [toTimezone, setToTimezone] = useState();
  const [showTimezone, setShowTimezone] = useState(false);

  useEffect(() => {
    getTrip();
  }, [params]);

  async function getTrip() {
    setShowTimezone(false);
    setShowForecast(false);
    try {
      const API = `${process.env.REACT_APP_API_ADDRESS}/trip/${params.tripid}`;
      const res = await axios.get(API);
      setTrip(res.data);
      const dateTemp = new Date(res.data.startDate);
      const dateEndTemp = new Date(res.data.endDate);

      let mm = dateTemp.getMonth() + 1; // Months start at 0!
      let dd = dateTemp.getDate();
      if (dd < 10) dd = "0" + dd;
      if (mm < 10) mm = "0" + mm;
      let formattedDate = dd + "/" + mm;
      setStartDate(formattedDate);
      mm = dateEndTemp.getMonth() + 1; // Months start at 0!
      dd = dateEndTemp.getDate();
      if (dd < 10) dd = "0" + dd;
      if (mm < 10) mm = "0" + mm;
      formattedDate = dd + "/" + mm;
      setEndDate(formattedDate);
      getTimezone(res.data);
      getForecast(res.data);
      setShowTimezone(true);
      setShowForecast(true);
    } catch (error) {
      console.log(error);
    }
  }

  async function getForecast(tripData) {
    let forecastArray = [];
    try {
      let date = new Date(tripData.startDate);
      for (let i = 0; i < 7; i++) {
        const yyyy = date.getFullYear();
        let mm = date.getMonth() + 1; // Months start at 0!
        let dd = date.getDate();
        if (dd < 10) dd = "0" + dd;
        if (mm < 10) mm = "0" + mm;
        const formattedDate = yyyy + "-" + mm + "-" + dd;
        let APIForecast = `${process.env.REACT_APP_API_ADDRESS}/weatherforecast?city=${tripData.destination}&date=${formattedDate}`;
        let res = await axios.get(APIForecast);
        forecastArray.push(res.data);
        date.setDate(date.getDate() + 1);
      }
      let tableForecast = forecastArray.map((data, index) => {
        return <DailyWeather data={data} key={index} />;
      });
      setWeatherForecast(tableForecast);
    } catch (error) {
      console.log(error);
    }
  }

  async function getTimezone(tripData) {
    try {
      let API = `${process.env.REACT_APP_API_ADDRESS}/timezone/${tripData.from}/${tripData.destination}`;
      let res = await axios.get(API);
      setFromTimezone(res.data.timezoneFrom);
      setToTimezone(res.data.timezoneTo);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="viewtrip">
      <h3>Trip Name: {trip.name}</h3>
      <h3>
        From {startDate} to {endDate}
      </h3>
      {!showForecast && !showTimezone && (
        <div className="animation">
          <ReactLoading type="spin" color="blue" height={200} width={200} />
        </div>
      )}
      <div className="component-container">
        {showTimezone && <TimeComponent trip={trip} fromTimezone={fromTimezone} toTimezone={toTimezone} />}
        {showForecast && <WeatherComponent tripDestination={trip.destination} weather={weatherForecast} />}
      </div>
    </div>
  );
}
