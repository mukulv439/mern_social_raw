import { useState } from 'react';

export default function NewPostForm() {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Make sure there is content before sending the request
    if (!content.trim()) {
      return;
    }

    setLoading(true);
    setError(null);
    setSuccessMessage('');

    // Get the token from localStorage
    const token = localStorage.getItem('token'); 

    if (!token) {
      setError('No token found. Please log in.');
      setLoading(false);
      return;
    }

    try {
      // Hit the API with the token in the Authorization header
      const response = await fetch('http://localhost:5000/api/posts/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Add the token here
        },
        body: JSON.stringify({ content }), // Send content as part of the request
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Post created successfully:', data);
        setContent('');
        setSuccessMessage('Post created successfully!');
      } else {
        const error = await response.json();
        console.error('Error creating post:', error);
        setError('Failed to create post. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting the form:', error);
      setError('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Create a New Post</h2>

        {error && (
          <div className="text-red-600 mb-4 p-2 border border-red-600 rounded">
            {error}
          </div>
        )}

        {successMessage && (
          <div className="text-green-600 mb-4 p-2 border border-green-600 rounded">
            {successMessage}
          </div>
        )}

        <textarea
          placeholder="What's on your mind?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full h-40 p-4 border-2 border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-blue-500"
          required
        />
        <button
          type="submit"
          className={`w-full py-2 rounded-lg focus:outline-none transition ${
            loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
          } text-white`}
          disabled={loading}
        >
          {loading ? 'Posting...' : 'Post'}
        </button>
      </form>
    </div>
  );
}
