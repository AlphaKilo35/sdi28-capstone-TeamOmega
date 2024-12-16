const express = require("express");
const router = express.Router();

const knex = require("../../knex.js");

const bcrypt = require("bcryptjs");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

passport.use(
  new LocalStrategy({usernameField: 'email'},async function (email, password, cb) {
    try {
      const user = await knex("users_tbl").where({
        email: email,
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
        knex("users_tbl")
          .update({ previousLogin: true })
          .where({ id: req.user.id })
          .then(() => {
            res.status(200).json({ redirectUrl: "/home" });
          });
      }
    });
  })(req, res, next);
});

router.post("/signup", (req, res) => {
  const { fullName, email, password, admin, authCode } = req.body;
  console.log(req.body);
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  const createUser = async () => {
    try {
      if (!admin) {
        const user = await knex("users_tbl")
          .insert({ name: fullName, email: email, password: hash, role: "user" })
          .returning("*");
        console.log(user);
        res.status(200).json({ success: true, code: 0 });
      } else if (admin && authCode === process.env.ADMIN_AUTH_STRING) {
        const user = await knex("users_tbl")
          .insert({ name: fullName, email: email, password: hash, role: "admin" })
          .returning("*");
        console.log(user);
        res.status(200).json({ success: true, code: 0 });
      } else {
        res.status(404).json({ success: false, code: 1 });
      }
    } catch (err) {
      res.status(500).json({ success: false, code: 2 });
    }
  };
  createUser();
});

router.get('/verify', (req, res)=>{

  try{

    if(req.isAuthenticated()){
      res.status(200).json(req.user)
    } else {
      res.status(404).json(false)
    }
  } catch(err){
    console.error('failed to verify user', err)
  }
})

router.post('/logout', (req, res, next)=>{
 try{
  req.logout(function(err) {
    if (err) {return next(err); }
    res.status(200).json(true)
  })
 } catch (err){
  res.status(500).json(false)
 }
})


router.get('/dev', (req, res)=> {
 req.logIn({id: 'dev'}, (error)=>{
  if(error) console.log(error)
    res.status(200).json(true)
 })
})

module.exports = router;
