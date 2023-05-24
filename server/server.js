const express = require("express");
const app = express();
const cors = require("cors");
const { default: mongoose } = require("mongoose");
require("dotenv").config();

// Middleware Connections
app.use(cors());
app.use(express.json());
mongoose.connect(process.env.DATABASE_URL);

const getTrip = require("./library/getTrip");
const postTrip = require("./library/postTrip");
const deleteTrip = require("./library/deleteTrip");
const getTrips = require("./library/getTrips");
const getTimeZone = require("./library/getTimezone");
const getWeatherForecast = require("./library/getWeatherForecast");

// Routes
app.get("/trips/:owner", getTrips);
app.get("/trip/:tripid", getTrip);
app.get("/timezone/:cityfrom/:cityto", getTimeZone);
app.get("/weatherforecast", getWeatherForecast);
app.post("/trip", postTrip);
app.delete("/trip/:id", deleteTrip);

// Connection
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("App running in port: " + PORT);
});
