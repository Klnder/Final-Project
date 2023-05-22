import React from "react";
import "./TripDashboard.css";
import { NavLink } from "react-router-dom";

export default function TripDashboard({ trip, deleteTrip }) {
  return (
    <article className="trip-container">
      <div className="trip-name">
        <h2>Name: {trip.name}</h2>
      </div>
      <div className="trip-details">
        <div className="trip-dates">
          <div className="fromText">
            <p>From: {trip.from}</p>
          </div>
          <div className="startText">
            <p>Start: {trip.startDate}</p>
          </div>
          <div className="endText">
            <p>End: {trip.endDate}</p>
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
