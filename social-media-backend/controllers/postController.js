const connection = require("../config/db");


exports.createPost = (req, res) => {
  const { content } = req.body;
  const sql = "INSERT INTO posts (user_id, content) VALUES (?, ?)";

  connection.query(sql, [req.user.id, content], (err) => {
    if (err) return res.status(400).json({ error: err.message });
    res.json({ message: "Post created successfully!" });
  });
};


exports.getFeedPosts = (req, res) => {
  const { userId } = req;
  const { page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;

  const sql = `
  SELECT  
  posts.*, 
  users.username, 
  (SELECT COUNT(*) FROM likes WHERE likes.post_id = posts.id) AS like_count,
  (SELECT COUNT(*) FROM likes WHERE likes.post_id = posts.id AND likes.user_id = 1) AS user_liked,
  EXISTS(
    SELECT 1 FROM follows 
    WHERE follows.followed_id = ? AND follows.follower_id = posts.user_id
  ) AS is_followed
FROM posts
JOIN users ON posts.user_id = users.id
ORDER BY posts.created_at DESC
LIMIT 10 OFFSET 0;
`;

  connection.query(
    sql,
    [userId, userId, parseInt(limit), offset],
    (err, results) => {
      if (err) {
        console.error("Error fetching feed posts:", err);
        return res.status(500).json({ error: "Failed to fetch feed posts." });
      }
      res.json(results);
    }
  );
};




// Like Post
  exports.likePost = (req, res) => {
    const { postId } = req.body;

    const checkLikeSql = "SELECT * FROM likes WHERE user_id = ? AND post_id = ?";
    connection.query(checkLikeSql, [req.user.id, postId], (err, results) => {
      if (err) return res.status(400).json({ error: err.message });

      if (results.length > 0) {
        const unlikeSql = "DELETE FROM likes WHERE user_id = ? AND post_id = ?";
        connection.query(unlikeSql, [req.user.id, postId], (err) => {
          if (err) return res.status(400).json({ error: err.message });
          return res.json({ message: "Post unliked." });
        });
      } else {
        const likeSql = "INSERT INTO likes (user_id, post_id) VALUES (?, ?)";
        connection.query(likeSql, [req.user.id, postId], (err) => {
          if (err) return res.status(400).json({ error: err.message });
          return res.json({ message: "Post liked!" });
        });
      }
    });
  };
