const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
//const route = require('./routes/routes.js)

const app = express();

//Middleware
app.use(cors());
app.use(express.json());
app.use(express.Router());
app.use(cookieParser());

//Routes
const departures = require('./routes/departures');
const dropZones = require('./routes/drop_zones');

// Register Routes
app.use('/departures', departures);
app.use('/drop_zones', dropZones);



//General | Root Route
app.get("/", (req, res) => {
  res.send("Express API Application is up and running")
})



module.exports = app;