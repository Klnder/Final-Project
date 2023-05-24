const Trip = require("../models/trip");

async function getTrips(request, response) {
  if (request.params.owner) {
    try {
      const trips = await Trip.find({ owner: request.params.owner });
      response.json(trips);
    } catch (error) {
      response.status(500).json("No trips to return");
    }
  } else {
    response.status(500).json("please enter an owner");
  }
}

module.exports = getTrips;
