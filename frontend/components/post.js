// components/Post.js
import { useState } from 'react';

const Post = ({ result }) => {
  const [likes, setLikes] = useState(result?.like_count);
  const [isFollowing, setIsFollowing] = useState(result?.is_followed);

  const likePost = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/posts/like`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ postId: result.id }), // Ensure postId is passed
      });
  
      if (res.ok) {
        const data = await res.json();
        setLikes((prevLikes) => (data.message === "Post liked!" ? prevLikes + 1 : prevLikes - 1)); // Adjust likes optimistically
      } else {
        const data = await res.json();
        alert(data.error || "Something went wrong.");
      }
    } catch (error) {
      console.error("Error liking post:", error);
      alert("Failed to like/unlike the post. Please try again later.");
    }
  };
  

  const followUser = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/posts/follow', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ followUserId: result.id }),
      });
  
      if (res.ok) {
        const data = await res.json();
        setIsFollowing(data.isFollowing); // Dynamically update based on backend response
        alert(data.message); // Inform user of follow/unfollow action
      } else {
        const data = await res.json();
        alert(data.error || "Something went wrong.");
      }
    } catch (error) {
      console.error("Error following/unfollowing user:", error);
      alert("Failed to follow/unfollow the user. Please try again later.");
    }
  };
  
console.log(result,"pos")
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
   
      <h2 className="text-xl font-semibold">{result.content}</h2>
      <p className="text-gray-700 mt-2">{result.content}</p>
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={likePost}
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Like {likes}
        </button>

        <button
          onClick={followUser}
          className={`${isFollowing ? 'bg-gray-400' : 'bg-green-500'
            } text-white py-2 px-4 rounded-md hover:bg-green-600`}
          disabled={isFollowing}
        >
          {isFollowing ? 'Following' : 'Follow'}
        </button>
      </div>
    </div>
  );
};

export default Post;
