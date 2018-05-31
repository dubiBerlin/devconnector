const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const keys = require("../../config/keys");
const jwt = require("jsonwebtoken");
const key = require("../../config/keys").secretOrKey;
// Load User model
const User = require("../../models/user");

// @route  GET api/users/test
// @desc   Tests users route
// @access Public
router.get("/test", (req, res) => {
  res.json({
    msg: "Users Works"
  });
});

// @route  GET api/users/register
// @desc   Register user
// @access Public
router.post("/register", (req, res) => {
  // findOne ist eine mongoose Methode die ja schon im User objekt
  // injiziert ist. Schaut nach einem Datensatz der im body der Methode definiert ist.
  User.findOne({
    email: req.body.email
  }).then(user => {
    if (user) {
      return res.status(400).json({
        email: "Email already exist"
      });
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200", // size
        r: "pg", // rating
        d: "mm" // default
      });
      const newUser = new User({
        name: req.body.name, // Kommt von der react form
        email: req.body.email,
        avatar: avatar,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;

          newUser
            .save() // save() ist mongose Funktion die in DB speichert
            .then(user => {
              res.json(user);
            })
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route  GET api/users/login
// @desc   login user
// @access Public
router.post("/login", (req, res) => {
  // findOne ist eine mongoose Methode die ja schon im User objekt
  // injiziert ist. Schaut nach einem Datensatz der im body der Methode definiert ist.
  User.findOne({
    email: req.body.email
  }).then(user => {
    if (user) {
      var pwHash = user.password;

      bcrypt.compare(req.body.password, pwHash).then(isMatch => {
        // res == true
        if (isMatch) {
          // session setzen
          const payload = {
            id: user.id,
            name: user.name,
            avatar: user.avatar
          };

          jwt.sign(payload, key, { expiresIn: 3600 }, (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token // Beare
            });
          });

          // return res.json({
          //   response: "Welcome " + req.body.name
          // });
        } else {
          return res.json({ response: "Password incorrect!" });
        }
      });
    } else {
      return res.status(400).json({
        email: "User not found!"
      });
    }
  });
});
module.exports = router;
