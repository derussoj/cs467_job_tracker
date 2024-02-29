// src/components/JobApplicationsList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// This component fetches and displays a list of job applications.
function JobApplicationsList() {
  const [jobApplications, setJobApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:3000/jobApplications')
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
        <div key={jobApplication.id}>
          <h2>{jobApplication.title}</h2>
          <p>{jobApplication.description}</p>
        </div>
      ))}
    </div>
  );
}

export default JobApplicationsList;