const Trip = require("../models/trip");

async function modifyTrip(request, response) {
  if (request.params.id) {
    try {
      const updatedTrip = await Trip.findByIdAndUpdate(request.params.id, request.body);
      response.json(updatedTrip);
    } catch (error) {
      response.status(500).json("cannot update trip");
    }
  } else {
    response.status(500).json("please enter a tripid");
  }
}

module.exports = modifyTrip;
