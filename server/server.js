const express = require("express");
const app = express();
const cors = require("cors");
const { default: mongoose } = require("mongoose");
require("dotenv").config();

// Mongo DB Connections
// mongoose
//   .connect(process.env.MONGO_DB_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then((response) => {
//     console.log("MongoDB Connection Succeeded.");
//   })
//   .catch((error) => {
//     console.log("Error in DB connection: " + error);
//   });

// Middleware Connections
app.use(cors());
app.use(express.json());
mongoose.connect(process.env.DATABASE_URL);

const getTrip = require("./library/getTrip");
const postTrip = require("./library/postTrip");
const deleteTrip = require("./library/deleteTrip");
const getTrips = require("./library/getTrips");
const getTimeZone = require("./library/getTimezone");

// Routes
app.get("/trips/:owner", getTrips);
app.get("/trip/:tripid", getTrip);
app.post("/trip", postTrip);
app.delete("/trip/:id", deleteTrip);

app.get("/timezone/:cityfrom/:cityto", getTimeZone);

// Connection
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("App running in port: " + PORT);
});
