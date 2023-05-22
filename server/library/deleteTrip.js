require("dotenv").config();
const axios = require("axios");
const Trip = require("../models/trip");

async function deleteTrip(request, response) {
  try {
    if (request.params.id) {
      const deletedTrip = await Trip.findByIdAndDelete(request.params.id);
      response.json(deletedTrip);
    } else {
      response.status(500).json("Please enter an ID");
    }
  } catch (error) {
    response.status(500).json("Cannot delete the book");
  }
}

module.exports = deleteTrip;
