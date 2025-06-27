// src/components/Layout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

export default function Layout() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main>
        {/* The Outlet will render the current page component (Assessor, History, etc.) */}
        <Outlet />
      </main>
    </div>
  );
}