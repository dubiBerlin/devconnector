const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const Post = require("../../models/Post");

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
            return res
              .status(401)
              .json({ notauthorized: "User not authorized" });
          }

          // delete
          post.remove().then(() => res.json({ success: true }));
        })
        .catch(err => res.status(404).json({ postnotfound: "No post found!" }));
    });
  }
);

// @route  POST api/posts/like/:id
// @desc   Like a post
// @access private
router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({
      user: req.user.id
    }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
            return res.status(400).json({ alreadyliked: "User already liked this post" });
          }

          // Add user id to likes array
          post.likes.unshift({ user: req.user.id });

          // Post wieder speichern
          post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({ postnotfound: "No post found!" }));
    });
  }
);

// @route  POST api/posts/unlike/:id
// @desc   Like a post
// @access private
router.post(
  "/unlike/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({
      user: req.user.id
    }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
            return res.status(400).json({ notliked: "You have not liked this post" });
          }

          // Get remove index
          const removeindex = post.likes.map(item => item.user.toString()).indexOf(req.user.id);

          // Splice out of array
          post.likes.splice(removeindex, 1);

          // Post wieder speichern
          post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({ postnotfound: "No post found!" }));
    });
  }
);

// @route  POST api/posts/unlike/:id
// @desc   Like a post
// @access private
router.post("/comment/:id", passport.authenticate("jwt", { session: false }), (req, res) => {
  Post.findById(req.params.id) // Post über die Id finden die über die url gesendet wird
    .then(post => {
      const newComment = {
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.user.id
      }

      // Add comments into the array of comments of the post
      post.comments.unshift(newComment);

      // save the post again
      post.save().then(post => res.json(post));

    }).catch(err => res.status(404).json({ postnotfound: "No post found" }));
});


// @route  DELETE api/posts/unlike/:id/:comment_id
// @desc   Remove comment from post
// @access private
router.delete("/comment/:id/:comment_id", passport.authenticate("jwt", { session: false }), (req, res) => {
  Post.findById(req.params.id) // Post über die Id finden die über die url gesendet wird
    .then(post => {

      if (post.comments.filter(comment => comment_id.toString() === req.params.comment_id).length === 0) {
        return res.status(404).json({ commentnotexist: "Comment does not exist" });
      }
      // get the index in the comments-array of the post
      const removeIndex = post.comments.map(item => item._id.toString()).indexOf(req.params.comment_id);

      // remove this comment
      post.comments.splice(removeIndex, 1);

      // save the post again
      post.save().then(post => res.json(post));

    }).catch(err => res.status(404).json({ postnotfound: "No post found" }));
});

module.exports = router;
