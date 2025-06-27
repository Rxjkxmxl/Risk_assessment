// src/components/History.jsx
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

export default function History() {
  const { currentUser, logout } = useAuth();
  
  return (
    <div>
      <h1>History Page</h1>
      <p>Email: {currentUser.email}</p>
      {/* Logic to display results will go here */}
      <button onClick={logout}>Log Out</button>
      <br />
      <Link to="/">Take a New Assessment</Link>
    </div>
  )
}