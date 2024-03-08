// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';

// import './App.css'; // Import CSS file for styles
// import JobApplicationsList from './components/jobApplications/JobApplicationsList';
import CreateJobApplication from './components/jobApplications/CreateJobApplication';
// import UpdateJobApplication from './components/jobApplications/UpdateJobApplication';
// import DeleteJobApplication from './components/jobApplications/DeleteJobApplication';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import NavBar from './components/navigation/NavBar';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3000'

  const handleLogout = () => {
    fetch(`${backendUrl}/auth/logout`, {
      method: 'POST',
      credentials: 'include', // Include the session cookie
    })
      .then(() => {
        setCurrentUser(null); // Update currentUser state
        window.location.href = '/'; // Redirect to home page
      })
      .catch((error) => console.error('Logout failed:', error));
  };

  useEffect(() => {
    fetch(`${backendUrl}/api/currentUser`, {
      credentials: 'include' // Required for cookies to be sent with the request
    })
      .then(response => response.json())
      .then(data => {
        if (data.isLoggedIn) {
          setCurrentUser(data.user); // Save the user's info in state
        } else {
          setCurrentUser(null);
        }
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, [backendUrl]);

  return (
    <Router>
      <div>
        <NavBar currentUser={currentUser} onLogout={handleLogout} />
        <Routes>
          <Route path="/about" element={<AboutPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/login" element={<LoginPage backendUrl={backendUrl} />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/jobApplications" element={
            <>
              {/* <JobApplicationsList currentUser={currentUser} /> */}
              <CreateJobApplication currentUser={currentUser} />
              {/* <UpdateJobApplication />
            <DeleteJobApplication /> */}
            </>
          } />
        </Routes>
      </div>

      <div>
        {currentUser ? (
          <div>
            <h1>Welcome, {currentUser.displayName}!</h1>
            {/* Render other parts of your app or user info here */}
          </div>
        ) : (
          <h1>Please log in.</h1>
          // Render login link or button here
        )}
      </div>
    </Router>
  );
}

export default App;