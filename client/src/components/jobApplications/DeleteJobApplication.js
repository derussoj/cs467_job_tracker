import React from 'react';
import axios from 'axios';

function DeleteJobApplication({ jobApplication }) {
  const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3000'

  const handleDelete = (id) => {
    // Send a DELETE request to delete the job application
    axios.delete(`${backendUrl}/jobApplications/${id}`)
      .then(() => {
        // Handle successful delete
      })
      .catch(error => {
        console.error('Error deleting job application:', error);
      });
  };

  return (
    <button onClick={() => handleDelete(jobApplication._id)}>Delete</button>
  );
}

export default DeleteJobApplication;