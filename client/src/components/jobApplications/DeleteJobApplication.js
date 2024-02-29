import React from 'react';
import axios from 'axios';

function DeleteJobApplication({ jobApplication }) {
  const handleDelete = (id) => {
    // Send a DELETE request to delete the job application
    axios.delete(`http://localhost:3000/jobApplications/${id}`)
      .then(() => {
        // Handle successful delete
      })
      .catch(error => {
        console.error('Error deleting job application:', error);
      });
  };

  return (
    <button onClick={() => handleDelete(jobApplication.id)}>Delete</button>
  );
}

export default DeleteJobApplication;