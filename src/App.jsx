// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout'; // Import the new Layout
import Assessor from './components/Assessor';
import Signup from './components/Signup';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import History from './components/History';

function App() {
  return (
    <Routes>
      {/* Public routes for login and signup */}
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />

      {/* This is the new, cleaner way to protect multiple routes */}
      <Route 
        path="/" 
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        {/* These routes are children of the Layout route */}
        {/* They will render inside the <Outlet /> */}
        <Route index element={<Assessor />} /> {/* 'index' means this is the default for '/' */}
        <Route path="history" element={<History />} />
      </Route>
    </Routes>
  );
}

export default App;