// src/components/Signup.jsx
import React, { useRef, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
// Import the Google icon along with the shield
import { FaShieldAlt, FaGoogle } from 'react-icons/fa';

export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  // Get both signup and signInWithGoogle from the AuthContext
  const { signup, signInWithGoogle } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handler for traditional email/password signup
  async function handleSubmit(e) {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('Passwords do not match');
    }
    try {
      setError('');
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      navigate('/');
    } catch (err) {
      setError('Failed to create an account. The email may already be in use.');
      console.error(err);
    }
    setLoading(false);
  }

  // Handler for the Google Sign-Up button (same logic as login)
  async function handleGoogleSignIn() {
    try {
      setError('');
      setLoading(true);
      await signInWithGoogle();
      navigate('/');
    } catch (err) {
      setError('Failed to sign up with Google.');
      console.error(err);
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Branding Panel (Left Side) */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-blue-700 to-gray-800 text-white flex-col justify-center items-center p-12 text-center">
        <FaShieldAlt size={60} className="mb-4" />
        <h1 className="text-4xl font-extrabold mb-2">Smart Risk Assessor</h1>
        <p className="text-lg text-blue-200">Turn uncertainty into actionable strategy.</p>
      </div>

      {/* Form Panel (Right Side) */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-100 p-8">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Create Your Account</h2>
          <p className="text-gray-600 mb-8">Get started by creating your account below.</p>

          {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-center">{error}</div>}

          {/* Google Sign-up Button */}
          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full flex items-center justify-center py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FaGoogle className="text-red-500 mr-3" />
            <span className="font-semibold text-gray-700">Sign Up with Google</span>
          </button>

          {/* Separator */}
          <div className="flex items-center my-6">
            <hr className="w-full border-t border-gray-300" />
            <span className="px-3 text-sm font-semibold text-gray-500">OR</span>
            <hr className="w-full border-t border-gray-300" />
          </div>

          {/* Traditional Email/Password Form */}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
              <input
                id="email"
                type="email"
                ref={emailRef}
                required
                className="w-full px-4 py-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700 mb-2">Password</label>
              <input
                id="password"
                type="password"
                ref={passwordRef}
                required
                placeholder="At least 6 characters"
                className="w-full px-4 py-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
             <div className="mb-6">
              <label htmlFor="password-confirm" className="block text-gray-700 mb-2">Confirm Password</label>
              <input
                id="password-confirm"
                type="password"
                ref={passwordConfirmRef}
                required
                className="w-full px-4 py-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-bold disabled:bg-blue-400 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account? <Link to="/login" className="text-blue-600 font-semibold hover:underline">Log In</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}