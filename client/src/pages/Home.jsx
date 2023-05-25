import React, { useState } from "react";
import TripDashboard from "../components/TripDashboard";
import EditModal from "../components/EditModal";

export default function Home({ trips, deleteTrip, user, getTrips }) {
  const [showModal, setShowModal] = useState(false);
  const [modalTrip, setModalTrip] = useState();

  let listTripsElement = trips.map((trip) => {
    return <TripDashboard trip={trip} deleteTrip={deleteTrip} key={trip._id} handleModal={handleModal} />;
  });
  function handleModal(trip) {
    setShowModal(!showModal);
    setModalTrip(trip);
  }

  return (
    <div id="home-container">
      <div className="title">
        <h2 className="home-title">You have {trips.length} trips incoming:</h2>
        {trips.length > 0 && <h2 className="home-title">That's exciting !!!</h2>}
      </div>
      <div className="trips-container">{listTripsElement}</div>
      <div>{showModal && <EditModal trip={modalTrip} handleModal={handleModal} user={user} getTrips={getTrips} />}</div>
    </div>
  );
}
