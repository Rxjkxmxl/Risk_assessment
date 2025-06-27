import React, { useRef, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { FaShieldAlt } from 'react-icons/fa'; // An icon for branding

export default function Login() {
  // --- Core Logic & State Management ---
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // --- Form Submission Handler ---
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError(''); // Clear previous errors
      setLoading(true); // Disable form and show loading state
      await login(emailRef.current.value, passwordRef.current.value);
      navigate('/'); // Redirect to the main page on successful login
    } catch (err) {
      // Provide a user-friendly error message
      setError('Failed to log in. Please check your credentials.');
      console.error(err); // Log the actual error for debugging
    }

    setLoading(false); // Re-enable form
  }

  // --- Rendered Component (UI) ---
  return (
    <div className="min-h-screen flex">
      {/* Branding Panel (Left Side) - Hidden on smaller screens */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-blue-700 to-gray-800 text-white flex-col justify-center items-center p-12 text-center">
        <FaShieldAlt size={60} className="mb-4" />
        <h1 className="text-4xl font-extrabold mb-2">Smart Risk Assessor</h1>
        <p className="text-lg text-blue-200">Turn uncertainty into actionable strategy.</p>
      </div>

      {/* Form Panel (Right Side) */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-100 p-8">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Welcome Back</h2>
          <p className="text-gray-600 mb-8">Please enter your details to log in.</p>

          {/* Display error messages */}
          {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-center">{error}</div>}
          
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
            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700 mb-2">Password</label>
              <input 
                id="password" 
                type="password" 
                ref={passwordRef} 
                required 
                className="w-full px-4 py-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500" 
              />
            </div>
            {/* Login button with loading state */}
            <button disabled={loading} className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-bold disabled:bg-blue-400 disabled:cursor-not-allowed">
              {loading ? 'Logging In...' : 'Log In'}
            </button>
          </form>

          {/* Link to Signup page */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Need an account? <Link to="/signup" className="text-blue-600 font-semibold hover:underline">Sign Up</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}