import React from 'react';
// THE FIX IS HERE. The path no longer includes "components/"
import Magnet from './Magnet'; 

const QuestionCard = ({ question, onAnswerSelect }) => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg mt-4 animate-fade-in">
      <p className="text-gray-600 text-sm">Category: {question.category}</p>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">{question.text}</h2>
      <div className="space-y-3">
        {question.options.map((option) => (
          <Magnet 
            key={option.id}
            magnetStrength={5} 
            padding={10} 
            wrapperClassName="block"
          >
            <button
              onClick={() => onAnswerSelect(question.id, option.id, option.riskValue)}
              className="w-full text-left p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-blue-100 hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
            >
              {option.text}
            </button>
          </Magnet>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;