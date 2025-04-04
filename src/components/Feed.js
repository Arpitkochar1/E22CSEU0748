import React, { useState, useEffect } from 'react';
import { getPosts } from '../api/posts';
import PostCard from './PostCard';

const Feed = ({ token }) => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const data = await getPosts(token);
      // Sort by ID (assuming higher ID means newer post)
      const sortedPosts = data.sort((a, b) => b.id - a.id);
      setPosts(sortedPosts);
    } catch (error) {
      console.error('Error fetching feed:', error);
    }
  };

  useEffect(() => {
    fetchPosts(); // Initial fetch
    const interval = setInterval(fetchPosts, 10000); // Poll every 10 seconds
    return () => clearInterval(interval); // Cleanup on unmount
  }, [token]);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Feed</h2>
      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post.id}>
            <PostCard post={post} token={token} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Feed;