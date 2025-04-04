import React, { useState, useEffect } from 'react';
import { getPosts } from '../api/posts';
import { getComments } from '../api/comments';
import PostCard from './PostCard';

const TrendingPosts = ({ token }) => {
  const [trendingPosts, setTrendingPosts] = useState([]);

  useEffect(() => {
    const fetchTrendingPosts = async () => {
      try {
        const posts = await getPosts(token);
        // Fetch comments count for each post
        const postsWithComments = await Promise.all(
          posts.map(async (post) => {
            const commentsData = await getComments(post.id, token);
            return {
              ...post,
              commentsCount: commentsData.comments ? commentsData.comments.length : 0,
            };
          })
        );

        // Sort by comments count (descending)
        const sortedPosts = postsWithComments.sort(
          (a, b) => b.commentsCount - a.commentsCount
        );
        setTrendingPosts(sortedPosts);
      } catch (error) {
        console.error('Error fetching trending posts:', error);
      }
    };
    fetchTrendingPosts();
  }, [token]);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Trending Posts</h2>
      <ul className="space-y-4">
        {trendingPosts.map((post) => (
          <li key={post.id}>
            <PostCard post={post} token={token} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrendingPosts;