// src/App.js
import React from 'react';
import axios from 'axios';
import './App.css'; // Import CSS file for styles

function App() {
  const handleCreateAccount = () => {
    // Redirect to account creation page
    console.log('Redirect to account creation');
  };

  const handleLogin = () => {
    // Redirect to login page
    console.log('Redirect to login');
  };

  return (
    <div className="app-container">
      <h1 className="app-title">Welcome to Job Tracker</h1>
      <div className="button-container">
        <button className="action-button" onClick={handleCreateAccount}>Create Account</button>
        <button className="action-button" onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}

export default App;