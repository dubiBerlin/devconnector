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

// @route  POST api/profile
// @desc   Create user profile
// @access Private
router.post(
  "/createprofile",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //Get fields
    const profileFields = {};
    profileFields.user = req.user.id; // die ID des eingeloggten Users

    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.githubusername)
      profileFields.githubusername = req.body.githubusername;
    //Skills - split into array weil daten kommen an, getrennt durch Kommata
    if (typeof req.body.skills !== "undefined") {
      profileFields.skills = req.body.skills.split(",");
    }

    // Social networks
    profileFields.social = {};

    if (req.body.youtube) profileFields.youtube = req.body.youtube;
    if (req.body.facebook) profileFields.facebook = req.body.facebook;
    if (req.body.twitter) profileFields.twitter = req.body.twitter;
    if (req.body.linkedin) profileFields.linkedin = req.body.linkedin;
    if (req.body.instagram) profileFields.instagram = req.body.instagram;

    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then(profile => {
          res.json(profile);
        });
      } else {
        // Create

        // check if handle exists
        Profile.findOne({
          handle: profileFields.handle
        }).then(profile => {
          if (profile) {
            errors.handle = "That handle already exists!";
            res.status(400).json(errors);
          }

          // Save profile
          new Profile(profileFields).save().then(profile => {
            res.json(profile);
          });
        });
      }
    });
  }
);
module.exports = router;
