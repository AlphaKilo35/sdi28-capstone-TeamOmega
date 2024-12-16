
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const authRouter = require("./routes/auth.js");
const localAuth = require('./routes/localAuth.js')
//const route = require('./routes/routes.js)


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



app.use(passport.initialize());
app.use(passport.authenticate("session"));

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
app.use('/users', users)

app.use('/oauth2', authRouter);
app.use('/local', localAuth)

//General | Root Route
app.get("/", (req, res) => {
  res.send("Express API Application is up and running");
});


module.exports = app;

