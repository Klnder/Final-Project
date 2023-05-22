require("dotenv").config();
const axios = require("axios");
const Trip = require("../models/trip");

async function postTrip(request, response) {
  console.log(request.body);
  try {
    const newTrip = await Trip.create(request.body);
    response.json(newTrip);
  } catch (error) {
    response.status(500).json("cannot create Trip");
  }
}

module.exports = postTrip;
