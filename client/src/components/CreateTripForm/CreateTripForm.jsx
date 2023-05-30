import axios from "axios";
import React, { useState } from "react";
import "./CreateTripForm.css";
import { useAuth0 } from "@auth0/auth0-react";
import { toast } from "react-toastify";
import { Button, TextField, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import { indigo } from "@mui/material/colors";
import SendRoundedIcon from "@mui/icons-material/SendRounded";

export default function CreateTripForm({ getTrips }) {
  const { user } = useAuth0();
  const [form, setForm] = useState({
    name: "",
    from: "",
    destination: "",
    startDate: "",
    endDate: "",
    transportType: "Flight",
    transportNumber: "",
  });
  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(indigo[500]),
    backgroundColor: indigo[500],
    "&:hover": {
      backgroundColor: indigo[700],
    },
  }));

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
  async function postTrip(event) {
    event.preventDefault();
    const lengthTrip = Math.round(Math.abs((new Date(form.endDate) - new Date(form.startDate)) / oneDay));
    const newTrip = {
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
      const API = `${process.env.REACT_APP_API_ADDRESS}/trip`;
      await axios.post(API, newTrip);
    } catch (error) {
      console.log(error);
      toast.error("Failed to add Trip :(");
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
    toast.success("New trip added !");
    getTrips(user);
  }

  return (
    <form onSubmit={postTrip}>
      <h3 className="titleForm">Create a new Trip</h3>
      <TextField
        required
        fullWidth
        id="test"
        name="name"
        label="Name"
        variant="outlined"
        onChange={handleChange}
        value={form.name}
        placeholder="An exciting name"
        margin="normal"
      />
      <Stack direction="row" spacing={1}>
        <TextField
          required
          id="from"
          name="from"
          label="From"
          variant="outlined"
          onChange={handleChange}
          value={form.from}
          placeholder="city departure"
          sx={{ width: 1 / 2 }}
        />
        <TextField
          required
          id="destination"
          name="destination"
          label="Destination"
          variant="outlined"
          onChange={handleChange}
          value={form.destination}
          placeholder="city arrival"
          sx={{ width: 1 / 2 }}
        />
      </Stack>
      <TextField
        required
        InputLabelProps={{ shrink: true }}
        fullWidth
        type="date"
        id="startDate"
        name="startDate"
        label="start date"
        variant="outlined"
        //min={formattedToday}
        onChange={handleChange}
        value={form.startDate}
        margin="normal"
      />
      <TextField
        required
        InputLabelProps={{ shrink: true }}
        fullWidth
        type="date"
        id="endDate"
        name="endDate"
        label="end date"
        variant="outlined"
        //min={form.startDate}
        onChange={handleChange}
        value={form.endDate}
        margin="normal"
      />
      <TextField
        required
        fullWidth
        id="transportNumber"
        name="transportNumber"
        label="flight number"
        variant="outlined"
        onChange={handleChange}
        value={form.transportNumber}
        placeholder="your flight number to track you"
        margin="normal"
      />
      <Stack direction="row" justifyContent="center" alignItems="center" sx={{ width: 1 }}>
        <ColorButton type="submit" variant="outlined" endIcon={<SendRoundedIcon />}>
          Submit
        </ColorButton>
      </Stack>
    </form>
  );
}
