// src/components/Questionnaire.js
import React from 'react';
import QuestionCard from './QuestionCard';
import ProgressBar from './ProgressBar';

const Questionnaire = ({ question, onAnswerSelect, currentIndex, totalQuestions }) => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <ProgressBar current={currentIndex + 1} total={totalQuestions} />
        <QuestionCard 
          question={question} 
          onAnswerSelect={onAnswerSelect} 
        />
      </div>
    </div>
  );
};

export default Questionnaire;