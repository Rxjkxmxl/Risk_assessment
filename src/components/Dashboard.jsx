// src/components/Dashboard.jsx
import React from 'react';
import RadarChart from './RadarChart';
import { FaUsers, FaLightbulb, FaBullseye, FaPiggyBank } from 'react-icons/fa'; // Import icons

// Map icons to categories
const categoryIcons = {
  Team: <FaUsers className="mr-3 text-blue-500" size={24} />,
  Product: <FaLightbulb className="mr-3 text-yellow-500" size={24} />,
  Market: <FaBullseye className="mr-3 text-green-500" size={24} />,
  Financials: <FaPiggyBank className="mr-3 text-red-500" size={24} />,
};

const Dashboard = ({ results, onReset }) => {
  const { scores, insights, overallScore } = results;

  const getScoreProfile = (score) => {
    if (score >= 65) return { text: 'High Risk', color: 'text-red-500' };
    if (score >= 40) return { text: 'Moderate Risk', color: 'text-yellow-500' };
    return { text: 'Low Risk', color: 'text-green-500' };
  };

  const scoreProfile = getScoreProfile(overallScore);

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-gray-900">Your Risk Profile</h1>
          <p className="mt-2 text-lg text-gray-600">An instant analysis of your startup's potential risks.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className="md:col-span-3 bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Risk Distribution</h2>
            <div className="h-80">
              <RadarChart scores={scores} />
            </div>
          </div>

          <div className="md:col-span-2 bg-white p-6 rounded-xl shadow-lg flex flex-col items-center justify-center">
            <h2 className="text-xl font-bold text-gray-800 mb-2">Overall Risk Score</h2>
            <p className={`text-7xl font-bold ${scoreProfile.color}`}>
              {overallScore}
            </p>
            <p className={`text-xl font-semibold ${scoreProfile.color}`}>{scoreProfile.text}</p>
            <p className="text-center mt-4 text-sm text-gray-600">This is a weighted average of your risk categories. Lower is better.</p>
          </div>
        </div>

        {insights.length > 0 && (
          <div className="mt-8 bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Actionable Suggestions</h2>
            <div className="space-y-4">
              {insights.map((insight, index) => (
                <div key={index} className="flex items-start bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                  {categoryIcons[insight.category]}
                  <div>
                    <h3 className="font-bold text-blue-800">{insight.category}</h3>
                    <p className="text-gray-700">{insight.suggestion}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div className="text-center mt-8">
          <button 
            onClick={onReset}
            className="px-8 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors"
          >
            Start New Assessment
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;