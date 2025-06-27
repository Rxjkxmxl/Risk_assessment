// src/components/History.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';

export default function History() {
  const { currentUser } = useAuth();
  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAssessments = async () => {
      if (!currentUser) return;
      
      setLoading(true);
      const assessmentsRef = collection(db, 'users', currentUser.uid, 'assessments');
      const q = query(assessmentsRef, orderBy('createdAt', 'desc'));
      
      const querySnapshot = await getDocs(q);
      const userAssessments = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      setAssessments(userAssessments);
      setLoading(false);
    };

    fetchAssessments();
  }, [currentUser]);

  const getScoreColor = (score) => {
    if (score >= 65) return 'bg-red-500';
    if (score >= 40) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        
          <h1 className="text-3xl font-bold text-gray-800">Assessment History</h1>
          <Link to="/" className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700">
            Take New Assessment
          </Link>
        </div>
        
        {loading ? (
          <p>Loading history...</p>
        ) : assessments.length === 0 ? (
          <p>You have no past assessments. Take one to start your journey!</p>
        ) : (
          <div className="space-y-4">
            {assessments.map(assessment => (
              <div key={assessment.id} className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
                <div>
                  <p className="text-lg font-semibold text-gray-700">
                    {new Date(assessment.createdAt?.toDate()).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(assessment.createdAt?.toDate()).toLocaleTimeString()}
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-gray-600">Overall Score:</span>
                  <span className={`px-3 py-1 text-white font-bold rounded-full text-lg ${getScoreColor(assessment.overallScore)}`}>
                    {assessment.overallScore}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
  );
}