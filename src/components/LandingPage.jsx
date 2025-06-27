// src/components/LandingPage.jsx

import { useAuth } from '../context/AuthContext'; // Make sure useAuth is imported
import { Link, useNavigate } from 'react-router-dom'; // Make sure Link and useNavigate are imported

const LandingPage = ({ onStart }) => {
  // ==========================================================
  // THE FIX IS HERE: This line was missing.
  // We must call useAuth() to get the currentUser and logout function.
  // ==========================================================
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login'); // Redirect to login page after logout
    } catch {
      console.error("Failed to log out");
    }
  };

  return (
    <div className="min-h-screen bg-gray-800 text-white flex flex-col items-center justify-center text-center p-4">
      {/* This line (and others below) will now work because currentUser is defined */}
      {currentUser && (
        <div className="absolute top-4 right-4 flex items-center space-x-4">
          <Link to="/history" className="text-sm text-white hover:underline">View History</Link>
          <div className="text-sm bg-gray-700 p-2 rounded-lg">
            Logged in as: <strong>{currentUser.email}</strong>
          </div>
        </div>
      )}
      
      <h1 className="text-5xl font-extrabold mb-4">Uncover Your Startup's Hidden Risks</h1>
      <p className="max-w-2xl text-xl text-gray-300 mb-8">
        Answer a few simple questions to receive an instant, AI-driven risk analysis and actionable insights to guide your strategy.
      </p>
      
      <div className="flex space-x-4">
        <button 
          onClick={onStart} 
          className="px-10 py-4 bg-blue-600 text-white text-xl font-bold rounded-lg hover:bg-blue-700 transition-transform transform hover:scale-105"
        >
          Start My Free Assessment
        </button>
        {currentUser && (
          <button 
            onClick={handleLogout} 
            className="px-10 py-4 bg-red-600 text-white text-xl font-bold rounded-lg hover:bg-red-700 transition-transform transform hover:scale-105"
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default LandingPage;