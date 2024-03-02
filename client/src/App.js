// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

import './App.css'; // Import CSS file for styles
// import JobApplicationsList from './components/jobApplications/JobApplicationsList';
import CreateJobApplication from './components/jobApplications/CreateJobApplication';
// import UpdateJobApplication from './components/jobApplications/UpdateJobApplication';
// import DeleteJobApplication from './components/jobApplications/DeleteJobApplication';

function App() {
  const [data, setData] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3000'

  useEffect(() => {
    axios.get(`${backendUrl}`)
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });

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
  }, [currentUser, backendUrl]);

  if (data === null) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route path="/jobApplications" element={
          <>
            {/* <JobApplicationsList /> */}
            <CreateJobApplication currentUser={currentUser} />
            {/* <UpdateJobApplication />
            <DeleteJobApplication /> */}
          </>
        } />
        <Route path="/" element={
          <div className="app-container">
            <pre>{JSON.stringify(data, null, 2)}</pre>
          </div>
        } />
      </Routes>
      <div className='login-button-container'>
        <Link to={`${backendUrl}/auth/google`}>
          <button className='google-button'>Login with Google</button>
        </Link>
        <Link to={`${backendUrl}/auth/github`}>
          <button className='github-button'>Login with GitHub</button>
        </Link>
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