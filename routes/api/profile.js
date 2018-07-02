const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// load validation
const validateProfileInput = require("../../validation/profile");
const validateExperienceInput = require("../../validation/experience");
const validateEducationInput = require("../../validation/education");
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
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    Profile.findOne({
      user: req.user.id
    })
      .populate("user", ["name", "avatar"]) // erstellt user objekt im profil welches zurück gegeben wird
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
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log(req.body);
    const { errors, isValid } = validateProfileInput(req.body);

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

    if (!isValid) {
      // return errors
      return res.status(400).json(errors);
    }

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

// @route  POST api/profile/handle/:handle
// @desc   Get profile by handle
// @access public
router.get("/handle/:handle", (req, res) => {
  const errors = {};

  Profile.findOne({
    handle: req.params.handle
  })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      // gibt das Profil zurück aus der DB
      if (!profile) {
        errors.noprofile = "There is no profile for this user!";

        res.status(404).json(errors); // 404 für not found
      }
      res.json(profile);
    })
    .catch(err => res.status(400).json(err));
});

// @route  POST api/profile/handle/:handle
// @desc   Get profile by handle
// @access public
router.get("/user/:user_id", (req, res) => {
  const errors = {};

  Profile.findOne({
    id: req.params.user_id
  })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      // gibt das Profil zurück aus der DB
      if (!profile) {
        errors.noprofile = "There is no profile for this user!";

        res.status(404).json(errors); // 404 für not found
      }
      res.json(profile);
    })
    .catch(err => res.status(400).json(err));
});

// @route  POST api/profile/handle/:handle
// @desc   Get profile by handle
// @access public
router.get("/all", (req, res) => {
  const errors = {};

  Profile.find()
    .populate("user", ["name", "avatar"])
    .then(profiles => {
      // gibt das Profil zurück aus der DB
      if (!profiles) {
        errors.noprofile = "There are no profiles";
        res.status(404).json(errors); // 404 für not found
      }
      res.json(profiles);
    })
    .catch(err => res.status(400).json({ profile: "There are no profiles" }));
});

// @route  POST api/profile/experience
// @desc   Add experience to profile
// @access Private
router.post(
  "/experience",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);

    // sucht das Profil anhand der UserId
    Profile.findOne({ user: req.user.id }).then(profile => {
      const newExp = {
        title: req.body.title,
        company: req.body.company,
        location: req.body.location,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      };

      // Add to exp array
      profile.experience.unshift(newExp);

      profile.save().then(profile => res.json(profile));
    });
  }
);

// @route  POST api/profile/experience
// @desc   Add experience to profile
// @access Private
router.post(
  "/education",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateEducationInput(req.body);

    // sucht das Profil anhand der UserId
    Profile.findOne({ user: req.user.id }).then(profile => {
      const newEdu = {
        school: req.body.school,
        degree: req.body.degree,
        fieldofstudy: req.body.fieldofstudy,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      };

      // Add to exp array
      profile.education.unshift(newEdu);

      profile.save().then(profile => res.json(profile));
    });
  }
);
module.exports = router;
