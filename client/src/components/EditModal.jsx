import axios from "axios";
import React, { useState } from "react";

export default function EditModal({ trip, handleModal, user, getTrips }) {
  const [form, setForm] = useState({
    name: trip.name,
    from: trip.from,
    destination: trip.destination,
    startDate: trip.startDate,
    endDate: trip.endDate,
    transportType: "Flight",
    transportNumber: trip.transport.number,
  });

  //manipulate current date to put it as the minimum in the form
  const oneDay = 24 * 60 * 60 * 1000;
  const currentDate = new Date();
  const yyyy = currentDate.getFullYear();
  let mm = currentDate.getMonth() + 1; // Months start at 0!
  let dd = currentDate.getDate();
  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;
  const formattedToday = yyyy + "-" + mm + "-" + dd;

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }
  async function editTrip(event) {
    event.preventDefault();
    const lengthTrip = Math.round(Math.abs((new Date(form.endDate) - new Date(form.startDate)) / oneDay));
    const modifiedTrip = {
      name: form.name,
      owner: user.nickname,
      from: form.from,
      destination: form.destination,
      startDate: form.startDate,
      endDate: form.endDate,
      duration: lengthTrip,
      transport: {
        type: form.transportType,
        number: form.transportNumber,
      },
    };

    try {
      const API = `${process.env.REACT_APP_API_ADDRESS}/trip/${trip._id}`;
      await axios.put(API, modifiedTrip);
    } catch (error) {
      console.log(error);
    }
    handleModal();
    getTrips(user);
  }

  return (
    <div className="modal">
      <form onSubmit={editTrip}>
        <fieldset>
          <legend>Modify Trip: {trip.name}</legend>
          <p>
            <label htmlFor="name">Name :</label>
            <input type="text" name="name" id="name" onChange={handleChange} value={form.name} placeholder="exciting name of your trip" />
          </p>
          <p>
            <label htmlFor="from">From :</label>
            <input type="text" name="from" id="from" onChange={handleChange} value={form.from} placeholder="city departure" />
          </p>
          <p>
            <label htmlFor="destination">Destination :</label>
            <input type="text" name="destination" id="tdestination" onChange={handleChange} value={form.destination} placeholder="city arrival" />
          </p>
          <p>
            <label htmlFor="startDate">Start date :</label>
            <input
              type="date"
              name="startDate"
              id="startDate"
              className="date-input"
              min={formattedToday}
              onChange={handleChange}
              value={form.startDate}
            />
          </p>
          <p>
            <label htmlFor="endDate">End Date :</label>
            <input type="date" name="endDate" id="endDate" className="date-input" min={form.startDate} onChange={handleChange} value={form.endDate} />
          </p>
          <p>
            <label htmlFor="transportNumber">Flight number :</label>
            <input
              type="text"
              name="transportNumber"
              id="transportNumber"
              onChange={handleChange}
              value={form.transportNumber}
              placeholder="your flight number to track you"
            />
          </p>
          <p>
            <button onClick={() => handleModal()}>cancel</button>
            <input type="submit" />
          </p>
          <br />
        </fieldset>
      </form>
    </div>
  );
}
