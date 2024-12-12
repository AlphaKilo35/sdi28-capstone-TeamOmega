const express = require("express");
const router = express.Router();

const knex = require("../../knex.js");

const bcrypt = require("bcryptjs");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

passport.use(
  new LocalStrategy(async function (username, password, cb) {
    try {
      const user = await knex("users").where({
        username: username,
      });
      const isAuthenticated = bcrypt.compareSync(password, user[0].password);
      if (user.length === 0) {
        return cb(null, false, { userFound: false, user: null });
      }
      if (!isAuthenticated) {
        return cb(null, false, { userFound: true, user: null });
      }
      return cb(null, user[0]);
    } catch (err) {
      return cb(err);
    }
  })
);

router.post("/login", (req, res, next) => {
  console.log("/login router fired");
  passport.authenticate("local", (err, user, response) => {
    if (err) return res.status(500).json({ message: "server error" });
    if (!user) return res.status(404).json(response);

    req.logIn(user, (err) => {
      if (err) return res.status(500).json({ message: "Login error" });
      if (req.isAuthenticated() && req.user) {
        res.status(200).json({ redirectUrl: "/" });
      }
    });
  })(req, res, next);
});

router.post("/signup", (req, res) => {

  const { username, password, admin, authCode } = req.body;
  console.log(req.body);
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  const createUser = async () => {
    try {
      if (!admin) {
        const user = await knex("users")
          .insert({ username: username, password: hash, role: "User" })
          .returning("*");
        console.log(user);
        res.status(200).json({success: true, code: 0});
      } else if (admin && authCode === process.env.ADMIN_AUTH_STRING) {
        const user = await knex("users")
          .insert({ username: username, password: hash, role: "Admin" })
          .returning("*");
        console.log(user);
        res.status(200).json({success:true, code: 0});

      } else {
        res.status(404).json({success:false, code: 1 });
      }
    } catch (err) {
      res.status(500).json({success:false, code: 2});
    }
  };
  createUser();
});

module.exports = router;
