// src/components/LandingPage.jsx
import { useAuth } from '../context/AuthContext'; // <-- NEW: Import useAuth
import { useNavigate } from 'react-router-dom'; // <-- NEW: Import for navigation

const LandingPage = ({ onStart }) => {
  const { currentUser, logout } = useAuth(); // <-- NEW: Get user and logout function
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
      {/* NEW: Welcome message if a user is logged in */}
      {currentUser && (
        <div className="absolute top-4 right-4 text-sm bg-gray-700 p-2 rounded-lg">
          Logged in as: <strong>{currentUser.email}</strong>
        </div>
      )}
      
      <h1 className="text-5xl font-extrabold mb-4">Uncover Your Startup's Hidden Risks</h1>
      <p className="max-w-2xl text-xl text-gray-300 mb-8">
        Answer a few simple questions to receive an instant, AI-driven risk analysis and actionable insights to guide your strategy.
      </p>
      
      {/* We now have two main buttons */}
      <div className="flex space-x-4">
        <button 
          onClick={onStart} 
          className="px-10 py-4 bg-blue-600 text-white text-xl font-bold rounded-lg hover:bg-blue-700 transition-transform transform hover:scale-105"
        >
          Start My Free Assessment
        </button>
        {/* NEW: Show logout button only when logged in */}
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