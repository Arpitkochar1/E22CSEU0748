import axios from 'axios';

const BASE_URL = 'http://20.244.56.144/evaluation-service';

// Get all posts
export const getPosts = async (token) => {
  try {
    const response = await axios.get(`${BASE_URL}/posts`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};