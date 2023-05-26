# API for my final project

API developed in Express JS allowing the client to interact with the database
and with multiple external API.

## Routes

Multiple routes are available:

### To connect with the database

- get /trips/:owner : return all Trips with the owner enter
- get /trip/:tripid : return a specific trip by ID
- post /trip : to create a new trip (send in the body)
- put /trip/:id : to modify a specific trip by ID
- delete /trip/:id : to delete a specific trip by ID

### To connect with external API

- get /timezone/:cityfrom/cityto : to return timezone of both the departure city and the arrival city
- get /weatherforecast: to return the forecast of the 7 first days of the travel
