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


//General | Root Route
app.get("/", (req, res) => {
  res.send("Express API Application is up and running");
});

module.exports = app;
