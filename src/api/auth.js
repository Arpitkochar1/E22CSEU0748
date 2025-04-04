import axios from 'axios';

const BASE_URL = 'http://20.244.56.144/evaluation-service';

// Register with the API
export const register = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/register`, userData);
    return response.data;
  } catch (error) {
    console.error('Error during registration:', error);
    throw error;
  }
};

// Authenticate to get the token
export const authenticate = async (authData) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth`, authData);
    return response.data;
  } catch (error) {
    console.error('Error during authentication:', error);
    throw error;
  }
};