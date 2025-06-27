// src/main.jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'; // <-- Import
import { AuthProvider } from './context/AuthContext'; // <-- Import
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter> {/* <-- Add Router */}
      <AuthProvider> {/* <-- Add Auth Provider */}
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)