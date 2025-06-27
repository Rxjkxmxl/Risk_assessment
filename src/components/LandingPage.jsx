// src/components/LandingPage.js
const LandingPage = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-gray-800 text-white flex flex-col items-center justify-center text-center p-4">
      <h1 className="text-5xl font-extrabold mb-4">Uncover Your Startup's Hidden Risks</h1>
      <p className="max-w-2xl text-xl text-gray-300 mb-8">
        Answer a few simple questions to receive an instant, AI-driven risk analysis and actionable insights to guide your strategy.
      </p>
      <button 
        onClick={onStart} 
        className="px-10 py-4 bg-blue-600 text-white text-xl font-bold rounded-lg hover:bg-blue-700 transition-transform transform hover:scale-105"
      >
        Start My Free Assessment
      </button>
    </div>
  );
};

export default LandingPage;