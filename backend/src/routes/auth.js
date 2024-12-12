const express = require("express");
require("dotenv").config({ path: "../../../.env" });
const passport = require("passport");
const knex = require("knex")(
  require("../../knexfile")[process.env.NODE_ENV || "development"]
);

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
                return cb(null, user, {
                  previousLogin: result[0].previousLogin,
                });
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
              return cb(null, result[0], {
                previousLogin: result[0].previousLogin,
              });
            }
          });
      }
    }
  )
);

const router = express.Router();

router.get("/login/google", passport.authenticate("google"));

router.get("/redirect/google", (req, res, next) => {
  passport.authenticate(
    "google",
    {
      failureRedirect: "/",
    },
    (err, user, response) => {
      if (err) return next(err);
      if (!user) return res.redirect("/");

      req.logIn(user, (err) => {
        if (req.isAuthenticated() && req.user) {
          if (response.previousLogin) {
            res.redirect("http://localhost:5173");
          } else {
            res.redirect("http://localhost:5173/setRole");
          }
        }
      });
    }
  )(req, res, next);
});

router.post("/role", (req, res) => {
  const { admin, authCode } = req.body;


  if (admin && authCode === process.env.ADMIN_AUTH_STRING) {
    try {
      knex("users")
        .update({ previousLogin: true, role: "Admin" })
        .where({ id: req.user.id })
        .then(() => {
          res.status(200).json({ roleCreated: true, message: "success" });
        });
    } catch (err) {
      
      res.status(500).json({ message: err.message });
    }
  } else if (admin && authCode !== process.env.ADMIN_AUTH_STRING) {
    res.status(404).json({ messageCode: 0 });
  } else {
    try {
      knex("users")
        .update({ previousLogin: true, role: "User" })
        .where({ id: req.user.id })
        .then(() => {
          res.status(200).json({ roleCreated: true, message: "success" });
        });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
});

module.exports = router;
