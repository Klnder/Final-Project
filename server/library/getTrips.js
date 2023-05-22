require("dotenv").config();
const axios = require("axios");
const Trip = require("../models/trip");

async function getTrips(request, response) {
  try {
    const trips = await Trip.find({ owner: request.params.owner });
    response.json(trips);
  } catch (error) {
    response.status(500).json("No trips to return");
  }
}

module.exports = getTrips;
