// components/PostFeed.js
import { useState, useEffect } from 'react';
import Post from './Post';

const PostFeed = ({ data }) => {
  const [posts, setPosts] = useState(data);
  const [error, setError] = useState('');
  useEffect(()=>
  {
    setPosts(data)
  },[data])



  return (
    <div className="space-y-6">
      {error && <p className="text-red-500">{error}</p>}
      {posts?.length === 0 ? (
        <p>No posts available.</p>
      ) : (
        posts?.map((post) => (
          <Post key={post.id} result={post} />
        ))
      )}
    </div>
  );
};

export default PostFeed;
