import React from "react";
import TripDashboard from "../components/TripDashboard";

export default function Home({ trips, deleteTrip }) {
  let listTripsElement = trips.map((trip) => {
    return <TripDashboard trip={trip} deleteTrip={deleteTrip} key={trip._id} />;
  });

  return (
    <div id="home-container">
      <div className="title">
        <h2>You have {trips.length} trips incoming:</h2>
      </div>
      <div className="trips-container">{listTripsElement}</div>
    </div>
  );
}
