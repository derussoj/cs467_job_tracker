// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

import './App.css'; // Import CSS file for styles
import JobApplicationsList from './components/jobApplications/JobApplicationsList';
import CreateJobApplication from './components/jobApplications/CreateJobApplication';
import UpdateJobApplication from './components/jobApplications/UpdateJobApplication';
import DeleteJobApplication from './components/jobApplications/DeleteJobApplication';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3000')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  if (data === null) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route path="/jobApplications" element ={
          <>
            {/* <JobApplicationsList /> */}
            <CreateJobApplication />
            {/* <UpdateJobApplication />
            <DeleteJobApplication /> */}
          </>
        } />
        <Route path="/" element ={
          <div className="app-container">
          <pre>{JSON.stringify(data, null, 2)}</pre>
          </div>
        } />
      </Routes>
      <div className='login-button-container'>
        <Link to="/auth/google">
          <button className='google-button'>Login with Google</button>
        </Link>
        <Link to="/auth/github">
          <button className='github-button'>Login with GitHub</button>
        </Link>
      </div>
    </Router>
  );
}

export default App;