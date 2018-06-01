const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Load profile model
const Profile = require("../../models/profile");

// Load User model
const User = require("../../models/user");

// @route  GET api/profile/test
// @desc   Tests profile route
// @access Public
router.get("/test", (req, res) => {
  res.json({
    msg: "Profile Works"
  });
});

// @route  GET api/profile
// @desc   Get current users profile
// @access Private
router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    Profile.findOne({
      user: req.user.id
    })
      .then(profile => {
        if (!Profile) {
          errors.noprofile = "There is no profile for this user";
          res.status(400).json(errors);
        }

        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);
module.exports = router;
