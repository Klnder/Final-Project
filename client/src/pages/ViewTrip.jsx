import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TimeComponent from "../components/TimeComponent";
import axios from "axios";

export default function ViewTrip({trips}) {
  const params = useParams();
  const [trip, setTrip] = useState("");

  async function getTrip() {
    try {
      const API = `${process.env.REACT_APP_API_ADDRESS}/trip/${params.tripid}`;
      const res = await axios.get(API);
      setTrip(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getTrip();
  });

  return (
    <div>
      Trip id: {trip.name}
      <TimeComponent trip={trip} />
    </div>
  );
}
