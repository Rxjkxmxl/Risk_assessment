// src/components/LoadingScreen.jsx
import React from 'react';

const LoadingScreen = () => {
  return (
    <div className="min-h-screen bg-gray-800 flex flex-col items-center justify-center text-white">
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-blue-400"></div>
      <p className="mt-4 text-xl text-gray-300">Calculating your risk profile...</p>
    </div>
  );
};

export default LoadingScreen;