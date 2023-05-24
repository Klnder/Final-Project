require("dotenv").config();
const axios = require("axios");

async function getTimezone(request, response) {
  if (request.params.cityfrom && request.params.cityto) {
    try {
      let reqInstance = axios.create({
        headers: {
          "X-Api-Key": `${process.env.SUPER_API_KEY}`,
        },
      });

      let API = `${process.env.SUPER_API_URL}/v1/timezone?city=${request.params.cityfrom}`;
      let resFrom = await reqInstance.get(API);
      let APITo = `${process.env.SUPER_API_URL}/v1/timezone?city=${request.params.cityto}`;
      let resTo = await reqInstance.get(APITo);

      let res = {
        timezoneFrom: resFrom.data.timezone,
        timezoneTo: resTo.data.timezone,
      };
      response.json(res);
    } catch (error) {
      response.status(500).json("cannot find timezone");
    }
  } else {
    response.status(500).json("Please enter a city from and a city to");
  }
}

module.exports = getTimezone;
