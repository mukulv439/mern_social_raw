const express = require("express");
const { createPost, getFeedPosts, likePost } = require("../controllers/postController");
const auth = require("../middleware/auth");
const { followUser } = require("../controllers/followController");
const router = express.Router();

router.post("/create", auth, createPost);
router.get("/", auth, getFeedPosts);
router.post("/like", auth, likePost);
router.post("/follow", auth, followUser);
module.exports = router;
