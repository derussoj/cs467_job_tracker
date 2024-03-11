import React, { useState, useEffect } from 'react';
import { ListGroup, Button } from 'react-bootstrap';
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
    <ListGroup>
      {jobApplications.map(jobApplication => (
        <ListGroup.Item key={jobApplication._id} className="d-flex justify-content-between align-items-start">
          <div>
            <h5>{jobApplication.jobTitle} at {jobApplication.company}</h5>
            <p>Date: {jobApplication.applicationDate}</p>
            <p>Status: {jobApplication.applicationStatus}</p>
          </div>
          <div>
            <Button variant="outline-primary" size="sm" onClick={() => console.log('edit!')}>Edit</Button>{' '}
            <Button variant="outline-danger" size="sm" onClick={() => console.log('delete!')}>Delete</Button>
          </div>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}

export default JobApplicationsList;
