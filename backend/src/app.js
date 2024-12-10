const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();

//Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

//Routes
const departures = require('./routes/departures');
const dropZones = require('./routes/drop_zones');
const flights = require('./routes/flights')
const manifests = require('./routes/manifests')

// Register Routes
app.use('/departures', departures);
app.use('/drop_zones', dropZones);
app.use('/flights', flights);
app.use('/manifests', manifests);


//General | Root Route
app.get("/", (req, res) => {
  res.send("Express API Application is up and running")
})



module.exports = app;