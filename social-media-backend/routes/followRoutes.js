const express = require("express");
const { followUser } = require("../controllers/followController");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/follow", auth, followUser);

module.exports = router;
