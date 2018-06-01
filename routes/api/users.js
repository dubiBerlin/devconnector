const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const keys = require("../../config/keys");
const jwt = require("jsonwebtoken");
const key = require("../../config/keys").secretOrKey;
// Load User model
const User = require("../../models/user");
const passport = require("passport");

// Load input validation
const validateRegisterInput = require("../../validation/register"); // importiert die Funktion die in der register.js zurückgegeben wird

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
  // user input Validierung
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors); // error ist definiert in der register.js
  }

  // findOne ist eine mongoose Methode die ja schon im User objekt
  // injiziert ist. Schaut nach einem Datensatz der im body der Methode definiert ist.
  User.findOne({
    email: req.body.email
  }).then(user => {
    if (user) {
      errors.email = "Email already exist";
      return res.status(400).json({
        errors
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

// @route  GET api/users/current
// @desc   Return current user
// @access private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log("athentication");
    res.json({ id: req.user.id, name: req.user.name });
  }
);
module.exports = router;
