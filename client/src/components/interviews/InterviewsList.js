import React, { useState, useEffect } from 'react';
import { ListGroup, Button } from 'react-bootstrap';
import axios from 'axios';

// This component fetches and displays a list of interviews.
function InterviewsList({ backendUrl, currentUser, refreshList }) {
  const [interviews, setInterviews] = useState([]);

  useEffect(() => {
    if (currentUser !== null) {
      axios.get(`${backendUrl}/interviews/user/${currentUser.id}`)
        .then(response => {
          setInterviews(response.data);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }
  }, [backendUrl, currentUser, refreshList]);

  return (
    <ListGroup>
      {interviews.map(interview => (
        <ListGroup.Item key={interview._id} className="d-flex justify-content-between align-items-start">
          <div>
            <h5>{interview.companyName}</h5>
            <p>Date and Time: {interview.interviewDateTime}</p>
            <p>Location: {interview.interviewLocation}</p>
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

export default InterviewsList;
