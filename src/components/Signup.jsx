// src/components/Signup.jsx
import React, { useRef, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    // --- Start Debugging ---
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    console.log("Attempting to sign up with:", email);
    // --- End Debugging ---

    // Password validation check
    if (password.length < 6) {
      return setError("Password must be at least 6 characters long");
    }

    try {
      setError('');
      setLoading(true);
      await signup(email, password);
      console.log("Signup successful! Navigating to homepage...");
      navigate('/'); // Redirect to the main page after signup
    } catch (err) { // IMPORTANT: Catch the specific error object
      console.error("Signup failed:", err); // Log the full error to the console
      
      // Provide a more specific error message to the user
      if (err.code === 'auth/email-already-in-use') {
        setError('This email address is already in use.');
      } else {
        setError('Failed to create an account. Please try again.');
      }
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        {/* This will now display our more helpful error message */}
        {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input type="email" ref={emailRef} required className="w-full px-3 py-2 border rounded-lg" />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700">Password</label>
            <input type="password" ref={passwordRef} required className="w-full px-3 py-2 border rounded-lg" />
          </div>
          <button disabled={loading} className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
            Sign Up
          </button>
        </form>
        <div className="mt-4 text-center">
          Already have an account? <Link to="/login" className="text-blue-600">Log In</Link>
        </div>
      </div>
    </div>
  );
}