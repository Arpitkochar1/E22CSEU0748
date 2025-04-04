import axios from 'axios';

const BASE_URL = 'http://20.244.56.144/evaluation-service';

// Get comments for a specific post
export const getComments = async (postId, token) => {
  try {
    const response = await axios.get(`${BASE_URL}/posts/${postId}/comments`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching comments:', error);
    throw error;
  }
};