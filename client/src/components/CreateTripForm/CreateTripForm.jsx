import axios from "axios";
import React, { useState } from "react";
import "./CreateTripForm.css";

export default function CreateTripForm({ user }) {
  const [form, setForm] = useState({
    name: "",
    from: "",
    destination: "",
    startDate: "",
    endDate: "",
    transportType: "Flight",
    transportNumber: "",
  });

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }
  async function postTrip(event) {
    event.preventDefault();
    const newTrip = {
      name: form.name,
      owner: user.nickname,
      from: form.from,
      destination: form.destination,
      startDate: form.startDate,
      endDate: form.endDate,
      transport: {
        type: form.transportType,
        number: form.transportNumber,
      },
    };
    console.log(newTrip);
    try {
      const API = `${process.env.REACT_APP_API_ADDRESS}/trip`;
      await axios.post(API, newTrip);
    } catch (error) {
      console.log(error);
    }

    setForm({
      name: "",
      from: "",
      destination: "",
      startDate: "",
      endDate: "",
      transportType: "Flight",
      transportNumber: "",
    });
  }

  return (
    <form onSubmit={postTrip}>
      <fieldset>
        <legend>Create a new Trip</legend>
        <p>
          <label htmlFor="name">Name :</label>
          <input type="text" name="name" id="name" onChange={handleChange} value={form.name} />
        </p>
        <p>
          <label htmlFor="from">From :</label>
          <input type="text" name="from" id="from" onChange={handleChange} value={form.from} />
        </p>
        <p>
          <label htmlFor="destination">Destination :</label>
          <input type="text" name="destination" id="tdestination" onChange={handleChange} value={form.destination} />
        </p>
        <p>
          <label htmlFor="startDate">Start date :</label>
          <input type="date" name="startDate" id="startDate" onChange={handleChange} value={form.startDate} />
        </p>
        <p>
          <label htmlFor="endDate">End Date :</label>
          <input type="date" name="endDate" id="endDate" min={form.startDate} onChange={handleChange} value={form.endDate} />
        </p>
        <p>
          <label htmlFor="transportNumber">Flight number :</label>
          <input type="text" name="transportNumber" id="transportNumber" onChange={handleChange} value={form.transportNumber} />
        </p>
        <p>
          <input type="submit" />
        </p>
        <br />
      </fieldset>
    </form>
  );
}
