import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { register, authenticate } from './api/auth';
import Navbar from './components/Navbar';
import TopUsers from './components/TopUsers';
import TrendingPosts from './components/TrendingPosts';
import Feed from './components/Feed';

const App = () => {
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const registerAndAuthenticate = async () => {
      try {
        // Step 1: Register
        const userData = {
          email: 'e22cseu0748@bennett.edu.in', 
          name: 'Arpit Kochar', 
          mobileNo: '7027114007', 
          githubUsername: 'Arpitkochar1', 
          rollNo: 'e22cseu0748', 
          collegeName: 'Bennett University', 
          accessCode: 'rtCHZJ', 
        };
        await register(userData);

        // Step 2: Authenticate
        const authData = {
          email: 'e22cseu0748@bennett.edu.in', 
          rollNo: 'e22cseu0748', 
          clientId: 'mgesWSspVhYbeuJU', 
          clientSecret: 'v1sAaa8bEckEN', 
        };
        const authResponse = await authenticate(authData);
        setToken(authResponse.access_token);
      } catch (err) {
        setError('Failed to authenticate. Check your credentials.');
      }
    };
    registerAndAuthenticate();
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <div className="flex-1">
          {error && (
            <p className="text-red-500 text-center mt-4">{error}</p>
          )}
          {token ? (
            <Routes>
              <Route path="/top-users" element={<TopUsers token={token} />} />
              <Route path="/trending-posts" element={<TrendingPosts token={token} />} />
              <Route path="/feed" element={<Feed token={token} />} />
              <Route path="/" element={<Feed token={token} />} /> {/* Default route */}
            </Routes>
          ) : (
            <p className="text-gray-600 text-center mt-4">Authenticating...</p>
          )}
        </div>
      </div>
    </Router>
  );
};

export default App;