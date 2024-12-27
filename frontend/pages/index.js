import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import PostFeed from '../components/PostFeed';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);  // For loading state
  const [error, setError] = useState(null);      // For error state
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/posts', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setPosts(data);  // Assuming the response contains an array of posts
        } else {
          const error = await response.json();
          setError(error.message || 'Failed to fetch posts');
        }
      } catch (error) {
        setError('An error occurred while fetching posts');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [router]);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="container p-6">
        <h1 className="text-4xl font-semibold text-gray-900 mb-8">Feed</h1>

        {loading && <p>Loading posts...</p>}

        {error && <p className="text-red-600">{error}</p>}

        {!loading && !error && <PostFeed data={posts} />}
      </div>
    </div>
  );
}
