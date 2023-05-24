const Trip = require("../models/trip");

async function getTrip(request, response) {
  if (request.params.tripid) {
    try {
      const trip = await Trip.findById(request.params.tripid);
      response.json(trip);
    } catch (error) {
      response.status(500).json("No trips to return");
    }
  } else {
    response.status(500).json("please enter a tripid");
  }
}

module.exports = getTrip;
