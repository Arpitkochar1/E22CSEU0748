import React, { useState, useEffect } from 'react';
import { getPosts } from '../api/posts';

const TopUsers = ({ token }) => {
  const [topUsers, setTopUsers] = useState([]);

  useEffect(() => {
    const fetchTopUsers = async () => {
      try {
        const posts = await getPosts(token);
        // Group posts by userid and count
        const userPostCounts = posts.reduce((acc, post) => {
          acc[post.userid] = (acc[post.userid] || 0) + 1;
          return acc;
        }, {});

        // Convert to array and sort by post count
        const sortedUsers = Object.entries(userPostCounts)
          .map(([userid, count]) => ({ userid, count }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 5); // Top 5 users

        setTopUsers(sortedUsers);
      } catch (error) {
        console.error('Error fetching top users:', error);
      }
    };
    fetchTopUsers();
  }, [token]);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Top Users</h2>
      <ul className="space-y-4">
        {topUsers.map((user) => (
          <li
            key={user.userid}
            className="bg-white shadow-md rounded-lg p-4 flex items-center space-x-4"
          >
            <img
              src={`https://picsum.photos/200/200?random=${user.userid}`}
              alt="User"
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <p className="text-gray-700">User ID: {user.userid}</p>
              <p className="text-gray-500">Posts: {user.count}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopUsers;