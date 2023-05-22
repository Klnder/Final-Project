require("dotenv").config();
const axios = require("axios");
const Trip = require("../models/trip");

async function getTrip(request, response) {
  try {
    const trip = await Trip.findById(request.params.tripid);
    response.json(trip);
  } catch (error) {
    response.status(500).json("No trips to return");
  }
}

module.exports = getTrip;
