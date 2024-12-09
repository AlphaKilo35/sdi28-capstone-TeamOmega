const express = require("express");
const passport = require("passport");
const knex = require("../../knex.js");

const GoogleStrategy = require("passport-google-oidc");

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
        .from("existing_credentials")
        .where({ provider: issuer, subject: profile.id });
      if (user.length === 0) {
        knex("users")
          .insert({ name: profile.displayName })
          .returning("id")
          .then((result) => {
            knex("existing_credentails")
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
          .where({ id: user.user_id })
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

router.get("/login/federated/google", passport.authenticate("google"));

router.get(
  "/oauth2/redirect/google",
  passport.authenticate("google", {
    failureRedirect: "/",
  }),
  (req, res) => {
    if (req.isAuthenticated() && req.user) {
      res.redirect("/home");
    } else {
      res.redirect("/");
    }
  }
);
