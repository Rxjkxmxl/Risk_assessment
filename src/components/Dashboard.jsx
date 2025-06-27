// src/components/Dashboard.js
import React from 'react';
import RadarChart from './RadarChart'; // We will create this next
import { riskCategories } from '../data/riskData';

const Dashboard = ({ results, onReset }) => {
  const { scores, insights, overallScore } = results;

  const getScoreColor = (score) => {
    if (score >= 70) return 'text-red-500';
    if (score >= 40) return 'text-yellow-500';
    return 'text-green-500';
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-gray-900">Your Risk Profile</h1>
          <p className="mt-2 text-lg text-gray-600">An instant analysis of your startup's potential risks.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Main Content: Chart and Insights */}
          <div className="md:col-span-3 bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Risk Distribution</h2>
            <div className="h-80">
              <RadarChart scores={scores} />
            </div>
          </div>

          {/* Side Panel: Overall Score */}
          <div className="md:col-span-2 bg-white p-6 rounded-xl shadow-lg flex flex-col items-center justify-center">
            <h2 className="text-xl font-bold text-gray-800 mb-2">Overall Risk Score</h2>
            <p className={`text-7xl font-bold ${getScoreColor(overallScore)}`}>
              {overallScore}
            </p>
            <p className="text-gray-500">out of 100</p>
            <p className="text-center mt-4 text-sm text-gray-600">This is a weighted average of your risk categories. Lower is better.</p>
          </div>
        </div>

        {/* Actionable Insights Section */}
        {insights.length > 0 && (
          <div className="mt-8 bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Actionable Suggestions</h2>
            <div className="space-y-4">
              {insights.map((insight, index) => (
                <div key={index} className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                  <h3 className="font-bold text-blue-800">{insight.category}</h3>
                  <p className="text-gray-700">{insight.suggestion}</p>
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