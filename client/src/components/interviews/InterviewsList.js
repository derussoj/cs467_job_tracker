import React, { useState, useEffect } from 'react';
import axios from 'axios';

// This component fetches and displays a list of interviews.
function InterviewsList({ backendUrl, currentUser, refreshList }) {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentUser !== null) {
      setLoading(true);
      axios.get(`${backendUrl}/interviews/user/${currentUser.id}`)
        .then(response => {
          setInterviews(response.data);
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
      {interviews.map(interview => (
        <div key={interview._id}>
          <h2>{interview.companyName}</h2>
          <p>{interview.interviewDateTime}</p>
        </div>
      ))}
    </div>
  );
}

export default InterviewsList;
