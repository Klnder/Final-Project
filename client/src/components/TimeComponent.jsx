import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import Clock from "react-live-clock";

export default function TimeComponent({ trip }) {
  const [fromTimezone, setFromTimezone] = useState("");
  const [toTimezone, setToTimezone] = useState("");
  const [showElement, setShowElement] = useState(false);

  useEffect(() => {
    getTimezone();
  }, []);

  async function getTimezone() {
    try {
      let APIFrom = `${process.env.REACT_APP_API_ADDRESS}/timezone/${trip.from}/${trip.destination}`;
      let res = await axios.get(APIFrom);
      setFromTimezone(res.data.timezoneFrom);
      setToTimezone(res.data.timezoneTo);
      setShowElement(true);
    } catch (error) {}
  }

  return (
    <article className="trip-component">
      {showElement && (
        <div>
          <p>{fromTimezone}</p>
          <p>{toTimezone}</p>
          <Clock format={"HH:mm:ss"} ticking={true} timezone={fromTimezone} />
          <br />
          <Clock format={"HH:mm:ss"} ticking={true} timezone={toTimezone} />
        </div>
      )}
    </article>
  );
}
