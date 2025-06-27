// src/components/Login.jsx
import React, { useRef, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setError('');
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      navigate('/');
    } catch {
      setError('Failed to log in');
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Log In</h2>
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
            Log In
          </button>
        </form>
        <div className="mt-4 text-center">
          Need an account? <Link to="/signup" className="text-blue-600">Sign Up</Link>
        </div>
      </div>
    </div>
  );
}