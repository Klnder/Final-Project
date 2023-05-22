import React from "react";
import { useParams } from "react-router-dom";

export default function ViewTrip() {
  const params = useParams();

  return <div>Trip id: {params.tripid}</div>;
}
