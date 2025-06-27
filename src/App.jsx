// src/App.jsx
import React, { useState, useEffect } from 'react'; // Import useEffect
import LandingPage from './components/LandingPage';
import Questionnaire from './components/Questionnaire';
import Dashboard from './components/Dashboard';
import { riskQuestions } from './data/riskData';
import { calculateRiskProfile } from './utils/calculateRisk';

const APP_STATE_KEY = 'riskAssessorState';

function App() {
  // Load initial state from localStorage, or use default values
  const [appState, setAppState] = useState(() => {
    const savedState = localStorage.getItem(APP_STATE_KEY);
    if (savedState) {
      return JSON.parse(savedState);
    }
    return {
      answers: {},
      currentQuestionIndex: 0,
      isQuizStarted: false,
    };
  });

  const [showResults, setShowResults] = useState(false);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(APP_STATE_KEY, JSON.stringify(appState));
  }, [appState]);

  const handleStartQuiz = () => {
    setAppState(prev => ({ ...prev, isQuizStarted: true }));
  };

  const handleAnswerSelect = (questionId, optionId, riskValue) => {
    const newAnswers = { ...appState.answers, [questionId]: { optionId, riskValue } };

    if (appState.currentQuestionIndex < riskQuestions.length - 1) {
      setAppState(prev => ({
        ...prev,
        answers: newAnswers,
        currentQuestionIndex: prev.currentQuestionIndex + 1
      }));
    } else {
      setAppState(prev => ({ ...prev, answers: newAnswers }));
      setShowResults(true);
    }
  };

  const handleReset = () => {
    // Clear state and localStorage
    const freshState = {
      answers: {},
      currentQuestionIndex: 0,
      isQuizStarted: false,
    };
    setAppState(freshState);
    setShowResults(false);
    localStorage.removeItem(APP_STATE_KEY);
  };

  // --- RENDER LOGIC ---
  if (showResults) {
    const results = calculateRiskProfile(appState.answers);
    return <Dashboard results={results} onReset={handleReset} />;
  }

  if (appState.isQuizStarted) {
    return (
      <Questionnaire
        question={riskQuestions[appState.currentQuestionIndex]}
        onAnswerSelect={handleAnswerSelect}
        currentIndex={appState.currentQuestionIndex}
        totalQuestions={riskQuestions.length}
      />
    );
  }

  return <LandingPage onStart={handleStartQuiz} />;
}

export default App;