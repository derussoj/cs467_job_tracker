import React, { useState } from 'react';
import axios from 'axios';

// This component includes a form to create a new job application.
function CreateSkill({ currentUser }) {
  const [skillName, setSkillName] = useState('');

  const [errors, setErrors] = useState({});

  const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3000'

  const resetForm = () => {
    setSkillName('');
  };

  const handleCreate = async (event) => {
    event.preventDefault();

    const skillData = {
      userId: currentUser.id,
      skillName
    };

    const newErrors = {};

    // Validate the form data
    if (!skillName) newErrors.skillName = 'Skill Name is required.';

    if (Object.keys(newErrors).length > 0) {
      // If there are errors, update the errors state and stop the form submission
      setErrors(newErrors);
      return;
    };

    // Send a POST request to create a new job application
    await axios.post(`${backendUrl}/skills`, skillData)
      .then(response => {
        // Handle successful create
        setTimeout(resetForm, 1000); // Reset the form after 1 second
      })
      .catch(error => {
        console.error('Error creating job application:', error);
      });
  };

  return (
    <div className="form-container">
      <h2>Create Skill</h2>
      <form onSubmit={handleCreate}>
        <label>
          Skill Name:
          <input type="text" value={skillName} onChange={e => setSkillName(e.target.value)} required />
          {errors.skillName && <div className="error">{errors.skillName}</div>}
        </label>
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default CreateSkill;