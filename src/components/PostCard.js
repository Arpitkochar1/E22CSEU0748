import React, { useState, useEffect } from 'react';
import { getComments } from '../api/comments';

const PostCard = ({ post, token }) => {
  const [commentsCount, setCommentsCount] = useState(0);
  const [randomImage, setRandomImage] = useState('');

  // Fetch comments count for the post
  useEffect(() => {
    const fetchCommentsCount = async () => {
      try {
        const data = await getComments(post.id, token);
        setCommentsCount(data.comments ? data.comments.length : 0);
      } catch (error) {
        console.error('Error fetching comments count:', error);
      }
    };
    fetchCommentsCount();
  }, [post.id, token]);

  // Generate a random image URL (using a placeholder service like Picsum)
  useEffect(() => {
    const randomId = Math.floor(Math.random() * 1000); // Random number for image
    setRandomImage(`https://picsum.photos/200/200?random=${randomId}`);
  }, [post.id]);

  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex items-start space-x-4 hover:shadow-lg transition-shadow">
      <img
        src={randomImage}
        alt="Random post"
        className="w-16 h-16 rounded-full object-cover"
      />
      <div>
        <p className="text-gray-700">{post.content}</p>
        <p className="text-sm text-gray-500">Comments: {commentsCount}</p>
      </div>
    </div>
  );
};

export default PostCard;