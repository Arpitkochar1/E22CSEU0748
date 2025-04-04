import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4 shadow-md">
      <ul className="flex space-x-6 justify-center">
        <li>
          <Link
            to="/top-users"
            className="text-white hover:text-blue-200 transition-colors"
          >
            Top Users
          </Link>
        </li>
        <li>
          <Link
            to="/trending-posts"
            className="text-white hover:text-blue-200 transition-colors"
          >
            Trending Posts
          </Link>
        </li>
        <li>
          <Link
            to="/feed"
            className="text-white hover:text-blue-200 transition-colors"
          >
            Feed
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;