const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const userRouter = require('./routes/user_training')

const app = express();

//Middleware
app.use(cors());
app.use(express.json());
app.use(express.Router());
app.use(cookieParser());

//Routes
app.use('/api/Individual-Training-Record', userRouter)


//General | Root Route
app.get("/", (req, res) => {
  res.send("Express API Application is up and running")
})



module.exports = app;