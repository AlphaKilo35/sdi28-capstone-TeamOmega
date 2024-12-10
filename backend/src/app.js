const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const manifestRoutes = require('./routes/manifest.js');  


const app = express();

//Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

//Routes

app.use('/api', manifestRoutes);

//General | Root Route
app.get("/", (req, res) => {
  res.send("Express API Application is up and running")
})



module.exports = app;