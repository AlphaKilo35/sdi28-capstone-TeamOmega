const express = require("express");
const router = express.Router();
const knex = require('knex')(require('../../knexfile')[process.env.NODE_ENV || 'development']);
const bcrypt = require("bcryptjs");

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  const checkCredentails = async () => {
    try {
      const user = await knex("users").where({
        username: username,
      });
      if (user.length === 0) {
        res.status(200).json({ userFound: false, user: null });
      } else {
        const isAuthenticated = bcrypt.compareSync(password, user[0].password);
        isAuthenticated
          ? res.status(200).json({ userFound: true, user: user[0] })
          : res.status(200).json({ userFound: true, user: null });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  checkCredentails();
});

module.exports = router;
