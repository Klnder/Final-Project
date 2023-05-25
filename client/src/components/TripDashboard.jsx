import React from "react";
import "./TripDashboard.css";
import { NavLink } from "react-router-dom";

export default function TripDashboard({ trip, deleteTrip, handleModal }) {
  const startDate = new Date(trip.startDate);
  const endDate = new Date(trip.endDate);
  const currentDate = new Date();
  const oneDay = 24 * 60 * 60 * 1000;
  const inDays = Math.round(Math.abs((startDate - currentDate) / oneDay));

  return (
    <article className="trip-container">
      <div className="trip-name">
        <h2>Name: {trip.name}</h2>
        <button onClick={() => handleModal(trip)}>Edit</button>
      </div>
      <div className="trip-details">
        <div className="trip-dates">
          <div className="fromText">
            <p>From: {trip.from}</p>
          </div>
          <div className="startText">
            <p>
              Start: {startDate.getDate()} / {startDate.getMonth() + 1}
            </p>
            <p>In : {inDays} days</p>
          </div>
          <div className="endText">
            <p>
              End: {endDate.getDate()} / {endDate.getMonth() + 1}
            </p>
          </div>
          <div className="toText">
            <p>To: {trip.destination}</p>
          </div>
        </div>
      </div>
      <div className="buttons">
        <NavLink to={`/viewtrip/${trip._id}`}>
          <button className="details-button">View details</button>
        </NavLink>
        <button onClick={() => deleteTrip(trip._id)}>Delete</button>
      </div>
    </article>
  );
}
