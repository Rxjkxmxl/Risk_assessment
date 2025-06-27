// src/components/LandingPage.jsx
// No need for useAuth, useNavigate, or Link here anymore

const LandingPage = ({ onStart }) => {
  return (
    // The main container class is different now because it's inside the Layout
    <div className="text-white flex flex-col items-center justify-center text-center p-8 bg-gray-800">
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
      </div>
    </div>
  );
};

export default LandingPage;