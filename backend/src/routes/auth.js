const express = require("express");
require("dotenv").config({ path: "../../../.env" });
const passport = require("passport");
const knex = require('knex')(require('../../knexfile')[process.env.NODE_ENV || 'development']);

const GoogleStrategy = require("passport-google-oidc");
console.log(process.env.GOOGLE_CLIENT_ID);
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/oauth2/redirect/google",
      scope: ["profile"],
    },
    async function verify(issuer, profile, cb) {
      console.log(profile)
      const user = await knex
        .select("*")
        .from("external_credentials")
        .where({ provider: issuer, subject: profile.id });
      if (user.length === 0) {
        knex("users")
          .insert({ name: profile.displayName })
          .returning("id")
          .then((result) => {
            knex("external_credentials")
              .insert({
                user_id: result[0].id,
                provider: issuer,
                subject: profile.id,
              })
              .then(() => {
                const user = { id: result[0].id, name: profile.displayName };
                return cb(null, user);
              });
          });
      } else {
        knex("users")
          .select("*")
          .where({ id: user[0].user_id })
          .then((result) => {
            if (result.length === 0) {
              return cb(null, false);
            } else {
              return cb(null, result[0]);
            }
          });
      }
    }
  )
);

passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    cb(null, { id: user.id, username: user?.username, name: user.name });
  });
});

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});

const router = express.Router();

router.get("/login/google", passport.authenticate("google"));

router.get(
  "/redirect/google",
  passport.authenticate("google", {
    failureRedirect: "/",
  }),
  (req, res) => {
    if (req.isAuthenticated() && req.user) {
      res.redirect("http://localhost:5173");
    } else {
      console.log("failure");
    }
  }
);

router.get('/users', (res, req)=>{
  res.send(req.user)
})

module.exports = router;
