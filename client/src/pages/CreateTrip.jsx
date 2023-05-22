import React from "react";
import CreateTripForm from "../components/CreateTripForm/CreateTripForm";

export default function CreateTrip({ user }) {
  return (
    <div id="createTrip">
      <CreateTripForm user={user} />
    </div>
  );
}
