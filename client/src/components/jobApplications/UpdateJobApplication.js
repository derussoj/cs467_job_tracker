import React from 'react';
import axios from 'axios';

// This component receives a job application as a prop and includes a form to update it.
function UpdateJobApplication({ jobApplication }) {
  const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3000'

  const handleUpdate = (id) => {
    // Send a PUT request to update the job application
    axios.put(`${backendUrl}/jobApplications/${id}`, {
      // Include the updated data here
    })
      .then(response => {
        // Handle successful update
      })
      .catch(error => {
        console.error('Error updating job application:', error);
      });
  };

  return (
    <div>
      {/* Include a form here to update the job application */}
      <button onClick={() => handleUpdate(jobApplication._id)}>Update</button>
    </div>
  );
}

export default UpdateJobApplication;