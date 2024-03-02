// src/components/JobApplicationsList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// This component fetches and displays a list of job applications.
function JobApplicationsList({ currentUser }) {
  const [jobApplications, setJobApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3000'

  useEffect(() => {
    axios.get(`${backendUrl}/jobApplications/user/${currentUser._id}`)
      .then(response => {
        setJobApplications(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {jobApplications.map(jobApplication => (
        <div key={jobApplication._id}>
          <h2>{jobApplication.jobTitle}</h2>
          <p>{jobApplication.jobDescription}</p>
        </div>
      ))}
    </div>
  );
}

export default JobApplicationsList;