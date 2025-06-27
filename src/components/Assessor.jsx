// src/components/Assessor.jsx
import React, { useState } from 'react';
import { db } from '../firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import LandingPage from './LandingPage';
import Questionnaire from './Questionnaire';
import Dashboard from './Dashboard';
import { riskQuestions } from '../data/riskData';
import { calculateRiskProfile } from '../utils/calculateRisk';
import { useAuth } from '../context/AuthContext';

export default function Assessor() {
  const { currentUser } = useAuth(); // We just need the user here
  const [answers, setAnswers] = useState({});
  // ... (rest of the state variables are the same)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [resultsData, setResultsData] = useState(null);


  const handleStartQuiz = () => setIsQuizStarted(true);

  const handleAnswerSelect = (questionId, optionId, riskValue) => {
    // ... (no change in this function)
    const newAnswers = { ...answers, [questionId]: { optionId, riskValue } };
    setAnswers(newAnswers);

    if (currentQuestionIndex < riskQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      const finalResults = calculateRiskProfile(newAnswers);
      setResultsData(finalResults);
      saveResultsToFirestore(finalResults);
      setShowResults(true);
    }
  };
  
  async function saveResultsToFirestore(results) {
    // ... (no change in this function)
    if (!currentUser) {
      console.error("No user logged in, cannot save results.");
      return;
    }
    const timestamp = new Date().toISOString();
    const resultsRef = doc(db, 'users', currentUser.uid, 'assessments', timestamp);
    try {
      await setDoc(resultsRef, {
        ...results,
        createdAt: serverTimestamp(),
      });
      console.log("Assessment saved successfully!");
    } catch (error) {
      console.error("Error saving assessment to Firestore:", error);
    }
  }

  const handleReset = () => {
    // ... (no change in this function)
    setAnswers({});
    setCurrentQuestionIndex(0);
    setIsQuizStarted(false);
    setShowResults(false);
    setResultsData(null);
  };

  // --- RENDER LOGIC for Assessor ---
  if (showResults) {
    return <Dashboard results={resultsData} onReset={handleReset} />;
  }

  if (isQuizStarted) {
    return (
      <Questionnaire
        question={riskQuestions[currentQuestionIndex]}
        onAnswerSelect={handleAnswerSelect}
        currentIndex={currentQuestionIndex}
        totalQuestions={riskQuestions.length}
      />
    );
  }

  return <LandingPage onStart={handleStartQuiz} />;
}