const Trip = require("../models/trip");

async function postTrip(request, response) {
  if (request.body) {
    try {
      const newTrip = await Trip.create(request.body);
      response.json(newTrip);
    } catch (error) {
      response.status(500).json("cannot create Trip");
    }
  } else {
    response.status(500).json("Please enter a trip in the body");
  }
}

module.exports = postTrip;
