// src/App.jsx

import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import Questionnaire from './components/Questionnaire';
import Dashboard from './components/Dashboard';
import { riskQuestions } from './data/riskData';
import { calculateRiskProfile } from './utils/calculateRisk';

function App() {
  // State to hold all the user's answers
  const [answers, setAnswers] = useState({});
  // State to track which question we are on
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  // State to check if the quiz has started (to move from LandingPage to Questionnaire)
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  // State to check if the quiz is finished (to move from Questionnaire to Dashboard)
  const [showResults, setShowResults] = useState(false);
  
  // This function is called when the "Start Assessment" button is clicked
  const handleStartQuiz = () => {
    console.log("Start button clicked. Setting isQuizStarted to true."); // <-- Debugging line
    setIsQuizStarted(true);
  };

  // This function is called every time a user selects an answer
  const handleAnswerSelect = (questionId, optionId, riskValue) => {
    const newAnswers = { ...answers, [questionId]: { optionId, riskValue } };
    setAnswers(newAnswers);

    // Check if there are more questions left
    if (currentQuestionIndex < riskQuestions.length - 1) {
      // If yes, move to the next question
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // If no, it's the last question. Time to show the results.
      setShowResults(true);
    }
  };

  // This function resets the app to its initial state
  const handleReset = () => {
    setAnswers({});
    setCurrentQuestionIndex(0);
    setIsQuizStarted(false);
    setShowResults(false);
  };

  // --- This is the rendering logic ---
  // It checks the state to decide what to show on the screen.

  // 1. If the quiz is finished, calculate results and show the Dashboard
  if (showResults) {
    const results = calculateRiskProfile(answers);
    return <Dashboard results={results} onReset={handleReset} />;
  }

  // 2. If the quiz has started but is not finished, show the Questionnaire
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

  // 3. By default (at the very beginning), show the LandingPage
  return <LandingPage onStart={handleStartQuiz} />;
}

export default App;