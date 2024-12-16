const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const authRouter = require("./routes/auth.js");
const userRouter = require('./routes/user_training')
const localAuth = require('./routes/localAuth.js')


const app = express();

//Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000', 'http://127.0.0.1:5173'],
  credentials: true
}));

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
      maxAge: 360000,
    },
  })
);

passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    cb(null, { id: user.id });
  });
});

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});

//Routes
const departures = require('./routes/departures');
const dropZones = require('./routes/drop_zones');
const flights = require('./routes/flights')
const manifests = require('./routes/manifests')
const users = require('./routes/users')

// Register Routes
app.use('/departures', departures);
app.use('/drop_zones', dropZones);
app.use('/flights', flights);
app.use('/manifests', manifests);
app.use('/api/Individual-Training-Record', userRouter);
app.use('/users', users);
app.use(passport.initialize());
app.use(passport.authenticate("session"));
app.use('/oauth2', authRouter);
app.use('/local', localAuth)

//General | Root Route
app.get("/", (req, res) => {
  res.send("Express API Application is up and running");
});

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
