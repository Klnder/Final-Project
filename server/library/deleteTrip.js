const Trip = require("../models/trip");

async function deleteTrip(request, response) {
  if (request.params.id) {
    try {
      const deletedTrip = await Trip.findByIdAndDelete(request.params.id);
      response.json(deletedTrip);
    } catch (error) {
      response.status(500).json("Cannot delete the trip");
    }
  } else {
    response.status(500).json("Please enter an ID");
  }
}

module.exports = deleteTrip;
