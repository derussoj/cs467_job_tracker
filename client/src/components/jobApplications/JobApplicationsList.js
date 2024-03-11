import React, { useState, useEffect } from 'react';
import axios from 'axios';

// This component fetches and displays a list of job applications.
function JobApplicationsList({ backendUrl, currentUser, refreshList }) {
  const [jobApplications, setJobApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentUser !== null) {
      setLoading(true);
      axios.get(`${backendUrl}/jobApplications/user/${currentUser.id}`)
        .then(response => {
          setJobApplications(response.data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
          setLoading(false);
        });
    }
  }, [backendUrl, currentUser, refreshList]);

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
