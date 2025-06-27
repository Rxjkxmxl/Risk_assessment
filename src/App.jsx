// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Assessor from './components/Assessor'; // We will create this
import Signup from './components/Signup';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import History from './components/History';

function App() {
  const { currentUser } = useAuth();

  return (
    <Routes>
      <Route path="/" element={
          <ProtectedRoute>
            {/* If a user has past results, maybe redirect to /history? For now, we go to assessor */}
            <Assessor />
          </ProtectedRoute>
        } 
      />
      <Route path="/history" element={
        <ProtectedRoute>
          <History />
        </ProtectedRoute>
      } />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;