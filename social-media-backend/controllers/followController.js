const connection = require("../config/db");

// Follow a User
exports.followUser = (req, res) => {
  const { followUserId } = req.body;

  // Validate input
  if (!followUserId) {
    return res.status(400).json({ error: "User to follow is required." });
  }

  const userId = req.user?.id; // Assuming `req.user` is set by authentication middleware
  if (!userId) {
    return res.status(401).json({ error: "Authentication required." });
  }

  const checkFollowSql = "SELECT * FROM follows WHERE follower_id = ? AND followed_id = ?";
  connection.query(checkFollowSql, [userId, followUserId], (err, results) => {
    if (err) {
      console.error("Error checking follow status:", err);
      return res.status(500).json({ error: "Failed to check follow status." });
    }

    if (results.length > 0) {
      // User is already following, so unfollow
      const unfollowSql = "DELETE FROM follows WHERE follower_id = ? AND followed_id = ?";
      connection.query(unfollowSql, [userId, followUserId], (err) => {
        if (err) {
          console.error("Error unfollowing user:", err);
          return res.status(500).json({ error: "Failed to unfollow user." });
        }
        return res.json({ message: "User unfollowed.", isFollowing: false });
      });
    } else {
      // User is not following, so follow
      const followSql = "INSERT INTO follows (follower_id, followed_id) VALUES (?, ?)";
      connection.query(followSql, [userId, followUserId], (err) => {
        if (err) {
          console.error("Error following user:", err);
          return res.status(500).json({ error: "Failed to follow user." });
        }
        return res.json({ message: "User followed!", isFollowing: true });
      });
    }
  });
};