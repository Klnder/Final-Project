const mongoose = require("mongoose");

const { Schema } = mongoose;

const tripSchema = new Schema({
  name: String,
  owner: String,
  description: String,
  startDate: String,
  endDate: String,
  from: String,
  destination: String,
  transport: Object,
});

const Trip = mongoose.model("trip", tripSchema);

module.exports = Trip;
