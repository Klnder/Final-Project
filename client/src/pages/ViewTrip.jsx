import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TimeComponent from "../components/TimeComponent";
import WeatherComponent from "../components/WeatherComponent";
import axios from "axios";
import ReactLoading from "react-loading";
import "./ViewTrip.css";

export default function ViewTrip() {
  const params = useParams();
  const [trip, setTrip] = useState({});
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  async function getTrip() {
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
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getTrip();
  }, [params.tripid]);

  return (
    <div className="viewtrip">
      <h3>Trip Name: {trip.name}</h3>
      <h3>
        From {startDate} to {endDate}
      </h3>
      {Object.keys(trip).length === 0 && (
        <div className="animation">
          <ReactLoading type="spin" color="blue" height={200} width={200} />
        </div>
      )}
      <div className="component-container">
        {Object.keys(trip).length !== 0 && <TimeComponent trip={trip} />}
        {Object.keys(trip).length !== 0 && <WeatherComponent trip={trip} />}
      </div>
    </div>
  );
}
