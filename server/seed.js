const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.DATABASE_URL);

const Trip = require("./models/trip");

async function seed() {
  await Trip.create({
    name: "test",
    owner: "jeremy",
    from: "London",
    destination: "Phuket",
    startDate: "19-01-2017",
    endDate: "20-01-2017",
    transport: {
      type: "Flight",
      number: "AAA123",
    },
  });
  mongoose.disconnect();
}

seed();
