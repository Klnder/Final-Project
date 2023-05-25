import React from "react";
import CreateTripForm from "../components/CreateTripForm/CreateTripForm";

export default function CreateTrip({ getTrips }) {
  return (
    <div id="createTrip">
      <CreateTripForm getTrips={getTrips} />
    </div>
  );
}
