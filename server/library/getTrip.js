require("dotenv").config();
const axios = require("axios");

async function getTrip(request, response) {
  response.json("here get a specific trip of a user");
}

module.exports = getTrip;
