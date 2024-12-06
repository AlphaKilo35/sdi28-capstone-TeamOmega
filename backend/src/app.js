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



//General | Root Route
app.get("/", (req, res) => {
  res.send("Express API Application is up and running")
})



module.exports = app;