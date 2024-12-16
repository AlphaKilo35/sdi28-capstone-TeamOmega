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
      scope: ["profile", "email"],
    },
    async function verify(issuer, profile, cb) {
      const user = await knex
        .select("*")
        .from("users_tbl")
        .where({ email: profile.emails[0].value });
      if (user.length === 0) {
        knex("users_tbl")
          .insert({ name: profile.displayName, email: profile.emails[0].value })
          .returning("id")
          .then((result) => {
            knex("external_credentials")
              .insert({
                user_id: result[0].id,
                provider: issuer,
                subject: profile.id,
                email: profile.emails[0].value,
              })
              .then(() => {
                const user = { id: result[0].id, name: profile.displayName };
                return cb(null, user, {
                  previousLogin: result[0].previousLogin,
                });
              });
          });
      } else {
        return cb(null, user[0], { previousLogin: user[0].previousLogin });
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
            res.redirect("http://localhost:5173/home");
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
      knex("users_tbl")
        .update({ previousLogin: true, role: "admin" })
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
      knex("users_tbl")
        .update({ previousLogin: true, role: "user" })
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
