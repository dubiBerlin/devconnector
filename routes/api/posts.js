const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const Post = require("../../models/Post");

const Profile = require("../../models/Profile");

const validatePostInput = require("../../validation/post");

// @route  GET api/posts/test
// @desc   Tests post route
// @access Public
router.get("/test", (req, res) => {
  res.json({
    msg: "Posts Works"
  });
});

// @route  GET api/posts/test
// @desc   Tests post route
// @access private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id
    });

    newPost.save().then(post => res.json(post));
  }
);

// @route  GET api/posts/test
// @desc   Tests post route
// @access Public
router.get("/posts", (req, res) => {
  var posts = {};
  Post.find() // finde alle posts
    .sort({ date: -1 }) // sortiere sie nach dem datum
    .then(posts => res.json(posts)) // gebe die posts als json zurück
    .catch(err => res.status(404));
});

// @route  GET api/posts/:id
// @desc   Get post by id
// @access Public
router.get("/:id", (req, res) => {
  const id = req.params.id; //id aus url auslesen

  Post.findById(id) // finde alle posts
    .then(posts => res.json(posts)) // gebe die posts als json zurück
    .catch(err => res.status(404).json({ nopostfound: "No post find by id" }));
});

// @route  DELETE api/posts/:id
// @desc   Get post by id
// @access private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const id = req.params.id; //id aus url auslesen

    // 
    Profile.findOne({
      user: req.user.id
    }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          if (post.user.toString() !== req.user.id) {
            return res.status(401).({ notauthorized: "User not authorized" });
          }

          // delete
          post.remove().then(() => res.json({ success: true }));  
        })
        .catch(err=> res.status(404).json({postnotfound: "No post found!"}));
    });
  }
);

module.exports = router;
