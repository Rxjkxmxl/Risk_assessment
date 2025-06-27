// src/components/Dashboard.jsx

import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import RadarChart from './RadarChart';
import useCountUp from '../hooks/useCountUp';
import { FaUsers, FaLightbulb, FaBullseye, FaPiggyBank, FaDownload, FaHistory, FaCheckCircle } from 'react-icons/fa';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// categoryIcons mapping remains the same
const categoryIcons = {
  Team: <FaUsers className="mr-3 text-blue-500" size={24} />,
  Product: <FaLightbulb className="mr-3 text-yellow-500" size={24} />,
  Market: <FaBullseye className="mr-3 text-green-500" size={24} />,
  Financials: <FaPiggyBank className="mr-3 text-red-500" size={24} />,
};

const Dashboard = ({ results, onReset }) => {
  // Guard clause to prevent rendering with null data
  if (!results) {
    return <div className="min-h-screen flex items-center justify-center"><p>Loading results...</p></div>;
  }
  
  const { currentUser } = useAuth();
  const { scores, insights, overallScore } = results;
  const animatedScore = useCountUp(overallScore || 0);
  const [history, setHistory] = useState([]);
  const [comparisonResult, setComparisonResult] = useState(null);

  // Fetch history when the component loads
  useEffect(() => {
    const fetchHistory = async () => {
      if (!currentUser) return;
      const assessmentsRef = collection(db, 'users', currentUser.uid, 'assessments');
      const q = query(assessmentsRef, orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const userHistory = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setHistory(userHistory.slice(1)); 
    };
    fetchHistory();
  }, [currentUser]);

  // Handle dropdown selection for comparison
  const handleComparisonSelect = (e) => {
    const selectedId = e.target.value;
    if (selectedId) {
      const selectedAssessment = history.find(h => h.id === selectedId);
      setComparisonResult(selectedAssessment);
    } else {
      setComparisonResult(null);
    }
  };

  // Determine score color and text
  const getScoreProfile = (score) => {
    if (score >= 65) return { text: 'High Risk', color: 'text-red-500' };
    if (score >= 40) return { text: 'Moderate Risk', color: 'text-yellow-500' };
    return { text: 'Low Risk', color: 'text-green-500' };
  };
  const scoreProfile = getScoreProfile(overallScore);

  // Handle PDF download
  const handleDownloadPdf = () => {
    const reportElement = document.getElementById('report-content');
    const animatedScoreEl = reportElement.querySelector('#animated-score');
    const finalScoreEl = reportElement.querySelector('#final-score');
    animatedScoreEl.style.display = 'none';
    finalScoreEl.style.display = 'block';

    html2canvas(reportElement, { scale: 2 }).then((canvas) => {
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
      <div id="report-content" className="max-w-4xl mx-auto bg-gray-50 p-4">
        {history.length > 0 && (
          <div className="mb-8 p-4 bg-white rounded-lg shadow-md flex items-center space-x-3">
            <FaHistory className="text-gray-500" />
            <label htmlFor="comparison-select" className="font-semibold text-gray-700">Compare with:</label>
            <select id="comparison-select" onChange={handleComparisonSelect} className="p-2 border rounded-md">
              <option value="">Select a past result...</option>
              {history.map(h => (
                <option key={h.id} value={h.id}>
                  {new Date(h.createdAt?.toDate()).toLocaleDateString()} - Score: {h.overallScore}
                </option>
              ))}
            </select>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className="md:col-span-3 bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Risk Distribution</h2>
            <div className="h-80">
              <RadarChart scores={scores} comparisonScores={comparisonResult?.scores} />
            </div>
          </div>
          <div className="md:col-span-2 bg-white p-6 rounded-xl shadow-lg flex flex-col items-center justify-center">
            <h2 className="text-xl font-bold text-gray-800 mb-2">Overall Risk Score</h2>
            <p id="animated-score" className={`text-7xl font-bold ${scoreProfile.color}`}>{animatedScore}</p>
            <p id="final-score" className={`text-7xl font-bold ${scoreProfile.color}`} style={{ display: 'none' }}>{overallScore}</p>
            {comparisonResult && (
              <div className="mt-2 text-center">
                <p className="text-gray-500">vs. 
                  <span className="font-bold"> {comparisonResult.overallScore} </span> 
                   previously
                </p>
              </div>
            )}
            <p className={`text-xl font-semibold ${scoreProfile.color}`}>{scoreProfile.text}</p>
          </div>
        </div>
        <div className="mt-8 bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Actionable Suggestions</h2>
          {insights.length > 0 ? (
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
          ) : (
            <div className="flex items-center p-4 bg-green-50 border-l-4 border-green-500 rounded-r-lg">
              <FaCheckCircle className="text-green-500 mr-4" size={28} />
              <div>
                <h3 className="font-bold text-green-800">Excellent Work!</h3>
                <p className="text-gray-700">Your assessment shows no high-risk areas. Keep focusing on solid execution and validating your assumptions.</p>
              </div>
            </div>
          )}
        </div>
      </div>
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