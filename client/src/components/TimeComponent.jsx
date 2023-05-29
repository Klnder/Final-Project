import React from "react";
import Clock from "react-live-clock";
import "./TimeComponent.css";

export default function TimeComponent({ trip, fromTimezone, toTimezone }) {
  const startDate = new Date(trip.startDate);
  const currentDate = new Date();
  const oneDay = 24 * 60 * 60 * 1000;
  const inDays = Math.round(Math.abs((startDate - currentDate) / oneDay));

  return (
    <article className="trip-component">
      <div className="time-container">
        <div className="inDays">
          <p>In: {inDays} days</p>
        </div>
        <div className="fromInfo">
          <div className="fromCity">
            <p>From: {trip.from}</p>
          </div>
          <div className="fromTime">
            <Clock format={"HH:mm:ss"} ticking={true} timezone={fromTimezone} />
          </div>
        </div>
        <div className="toInfo">
          <div className="toCity">
            <p>To: {trip.destination}</p>
          </div>
          <div className="toTime">
            <Clock format={"HH:mm:ss"} ticking={true} timezone={toTimezone} />
          </div>
        </div>
      </div>
    </article>
  );
}
