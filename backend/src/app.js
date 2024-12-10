const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const authRouter = require("./routes/auth.js");
const userRouter = require('./routes/user_training')

const app = express();

//Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: "Airborne",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      httpOnly: true,
      sameSite: "lax",
      maxAge: 36000,
    },
  })
);

app.use(passport.initialize());
app.use(passport.authenticate("session"));

//Routes
app.use('/api/Individual-Training-Record', userRouter);
app.use('/oauth2', authRouter);
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

//Flight Route
//Create entry
app.post('/flights/:id', (req, res) => {
  let {id, airframe, number_pax, dropzone, departure_area, date, time} = req.body
  knex('flight_tbl').returning('*').insert({id, airframe, number_pax, dropzone, departure_area, date, time})
  .then(data => {
    let flightId = data.map(flight => flight.id)
    res.json(flightId)
  })
})
//Read entries
app.get('/flights', (req,res)=>{
  knex('flight_tbl').select('*')
  .then(data => res.json(data))
})
//Update entries
app.patch('/flights/:id', (req, res) => {
  knex('flight_tbl').where('id', req.params.id).update(req.body).returning('*')
  .then(data => {
    res.json(data)
  })
})
//Delete entries
app.delete('/flights/:id', (req, res) => {
  knex('flight_tbl')
    .where('id', req.params.id)
    .del()
    .then(res.send('it workd'))
})




module.exports = app;
