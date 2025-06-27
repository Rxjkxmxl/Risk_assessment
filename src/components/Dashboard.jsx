// src/components/Dashboard.jsx

import React from 'react';
import RadarChart from './RadarChart';
import useCountUp from '../hooks/useCountUp'; // For Feature 1
import { FaUsers, FaLightbulb, FaBullseye, FaPiggyBank, FaDownload } from 'react-icons/fa';
import jsPDF from 'jspdf'; // For Feature 3
import html2canvas from 'html2canvas'; // For Feature 3

// This map is used for the suggestion cards
const categoryIcons = {
  Team: <FaUsers className="mr-3 text-blue-500" size={24} />,
  Product: <FaLightbulb className="mr-3 text-yellow-500" size={24} />,
  Market: <FaBullseye className="mr-3 text-green-500" size={24} />,
  Financials: <FaPiggyBank className="mr-3 text-red-500" size={24} />,
};

const Dashboard = ({ results, onReset }) => {
  const { scores, insights, overallScore } = results;
  
  // Feature 1: Animated score for the user to see on screen
  const animatedScore = useCountUp(overallScore); 

  const getScoreProfile = (score) => {
    if (score >= 65) return { text: 'High Risk', color: 'text-red-500' };
    if (score >= 40) return { text: 'Moderate Risk', color: 'text-yellow-500' };
    return { text: 'Low Risk', color: 'text-green-500' };
  };

  const scoreProfile = getScoreProfile(overallScore);

  // Feature 3: Function to handle PDF generation
  const handleDownloadPdf = () => {
    const reportElement = document.getElementById('report-content');
    
    // Hide the animated score and show the final score just for the PDF capture
    const animatedScoreEl = reportElement.querySelector('#animated-score');
    const finalScoreEl = reportElement.querySelector('#final-score');
    animatedScoreEl.style.display = 'none';
    finalScoreEl.style.display = 'block';

    html2canvas(reportElement, { scale: 2 }).then((canvas) => {
      // Revert the visibility changes after capture
      animatedScoreEl.style.display = 'block';
      finalScoreEl.style.display = 'none';
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('risk-assessment-report.pdf');
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      {/* We give the content an ID so html2canvas knows what to capture */}
      <div id="report-content" className="max-w-4xl mx-auto bg-gray-50 p-4">
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
            {/* Display the animated score to the user */}
            <p id="animated-score" className={`text-7xl font-bold ${scoreProfile.color}`}>
              {animatedScore}
            </p>
            {/* Have the final score ready for the PDF, but hidden */}
            <p id="final-score" className={`text-7xl font-bold ${scoreProfile.color}`} style={{ display: 'none' }}>
              {overallScore}
            </p>
            <p className={`text-xl font-semibold ${scoreProfile.color}`}>{scoreProfile.text}</p>
            <p className="text-center mt-4 text-sm text-gray-600">This is a weighted average. Lower is better.</p>
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
      </div>

      {/* Buttons are outside the captured content div to avoid them being in the PDF */}
      <div className="max-w-4xl mx-auto flex justify-center items-center space-x-4 mt-8">
        <button 
          onClick={onReset}
          className="px-6 py-3 bg-gray-600 text-white font-bold rounded-lg hover:bg-gray-700 transition-colors"
        >
          Start New Assessment
        </button>
        <button 
          onClick={handleDownloadPdf}
          className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors flex items-center"
        >
          <FaDownload className="mr-2" />
          Download Report
        </button>
      </div>
    </div>
  );
};

export default Dashboard;