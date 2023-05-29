import React from "react";
import "./TripDashboard.css";
import { NavLink } from "react-router-dom";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import FlightTakeoffRoundedIcon from "@mui/icons-material/FlightTakeoffRounded";
import FlightLandRoundedIcon from "@mui/icons-material/FlightLandRounded";
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { indigo } from "@mui/material/colors";

export default function TripDashboard({ trip, deleteTrip, handleModal }) {
  const startDate = new Date(trip.startDate);
  const endDate = new Date(trip.endDate);
  const currentDate = new Date();
  const oneDay = 24 * 60 * 60 * 1000;
  const inDays = Math.round(Math.abs((startDate - currentDate) / oneDay));

  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(indigo[500]),
    backgroundColor: indigo[500],
    "&:hover": {
      backgroundColor: indigo[700],
    },
  }));

  return (
    <article className="trip-container">
      <div className="trip-name">
        <div className="title">
          <h2>Name: {trip.name}</h2>
        </div>
        <div className="edit">
          <ColorButton variant="outlined" onClick={() => handleModal(trip)} startIcon={<EditRoundedIcon />}>
            Edit
          </ColorButton>
        </div>
      </div>
      <div className="trip-details">
        <div className="trip-dates">
          <div className="fromText">
            <p>
              <FlightTakeoffRoundedIcon />: {trip.from}
            </p>
          </div>
          <div className="startText">
            <p>
              Start: {startDate.getDate()} / {startDate.getMonth() + 1}
            </p>
            <p>In : {inDays} days</p>
          </div>
          <div className="endText">
            <p>
              End: {endDate.getDate()} / {endDate.getMonth() + 1}
            </p>
          </div>
          <div className="toText">
            <p>
              <FlightLandRoundedIcon />: {trip.destination}
            </p>
          </div>
        </div>
      </div>
      <div className="buttons">
        <NavLink to={`/viewtrip/${trip._id}`}>
          <ColorButton variant="outlined" startIcon={<InfoRoundedIcon />}>
            Details
          </ColorButton>
        </NavLink>
        <ColorButton variant="outlined" onClick={() => deleteTrip(trip._id)} startIcon={<DeleteForeverRoundedIcon />}>
          Delete
        </ColorButton>
      </div>
    </article>
  );
}
