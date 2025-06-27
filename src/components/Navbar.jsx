// src/components/Navbar.jsx
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { FaShieldAlt, FaSignOutAlt, FaHistory } from 'react-icons/fa';

export default function Navbar() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch {
      console.error("Failed to log out");
    }
  };

  return (
    <nav className="bg-gray-800 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left Side: Brand */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center space-x-2">
              <FaShieldAlt className="text-blue-400" size={24} />
              <span className="font-extrabold text-xl">Smart Risk Assessor</span>
            </Link>
          </div>
          
          {/* Right Side: User Actions */}
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-300 hidden sm:block">
              {currentUser.email}
            </span>
            <Link to="/history" className="text-gray-300 hover:bg-gray-700 p-2 rounded-md" title="View History">
              <FaHistory size={20} />
            </Link>
            {/* THIS IS YOUR LOGOUT BUTTON IN THE RIGHT-MOST CORNER */}
            <button 
              onClick={handleLogout} 
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-3 rounded-md flex items-center space-x-2"
              title="Logout"
            >
              <FaSignOutAlt />
              <span className="hidden md:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}