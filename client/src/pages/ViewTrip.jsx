import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TimeComponent from "../components/TimeComponent";
import axios from "axios";
import ReactLoading from "react-loading";

export default function ViewTrip() {
  const params = useParams();
  const [trip, setTrip] = useState("");
  const [showComponents, setShowComponents] = useState(false);

  async function getTrip() {
    try {
      const API = `${process.env.REACT_APP_API_ADDRESS}/trip/${params.tripid}`;
      const res = await axios.get(API);
      setTrip(res.data);
      setShowComponents(true);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    setShowComponents(false);
    getTrip();
  }, [params.tripid]);

  return (
    <div className="viewtrip">
      <p>Trip Name: {trip.name}</p>
      {/* {!showComponents && (
        <div className="animation">
          <ReactLoading type="spin" color="blue" height={200} width={200} />
        </div>
      )} */}
      {showComponents && <TimeComponent trip={trip} />}
    </div>
  );
}
