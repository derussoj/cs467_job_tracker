
import React, { useState } from 'react';
import axios from 'axios';
import { APPLICATION_STATUS_OPTIONS } from '../constants';

// This component includes a form to create a new job application.
function CreateJobApplication() {
    const [userId, setUserId] = useState('');
    const [company, setCompany] = useState('');
    const [jobTitle, setJobTitle] = useState('');
    const [applicationDate, setApplicationDate] = useState('');
    const [applicationStatus, setApplicationStatus] = useState('');
    const [jobDescription, setJobDescription] = useState('');
    const [salary, setSalary] = useState('');
    const [location, setLocation] = useState('');
    const [applicationNotes, setApplicationNotes] = useState('');

    const [errors, setErrors] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    const resetForm = () => {
        setUserId('');
        setCompany('');
        setJobTitle('');
        setApplicationDate('');
        setApplicationStatus('');
        setJobDescription('');
        setSalary('');
        setLocation('');
        setApplicationNotes('');
        setErrors({});
        setIsSubmitted(false);
    };

    const handleCreate = (event) => {
        event.preventDefault();

        const newErrors = {};

        // Validate the form data
        if (!userId) newErrors.userId = 'User ID is required.';
        if (!company) newErrors.company = 'Company is required.';
        if (!jobTitle) newErrors.jobTitle = 'Job title is required.';
        if (!applicationDate) newErrors.applicationDate = 'Application date is required.';
        if (!applicationStatus) newErrors.applicationStatus = 'Application status is required.';

        if (Object.keys(newErrors).length > 0) {
        // If there are errors, update the errors state and stop the form submission
        setErrors(newErrors);
        return;
    };

    // Send a POST request to create a new job application
    axios.post('http://localhost:3000/jobApplications', {
        userId,
        company,
        jobTitle,
        applicationDate,
        applicationStatus,
        jobDescription,
        salary,
        location,
        applicationNotes
    })
      .then(response => {
        // Handle successful create
        setIsSubmitted(true);
        setTimeout(resetForm, 1000); // Reset the form after 1 second
      })
      .catch(error => {
        console.error('Error creating job application:', error);
      });
  };

  return (
    <div className="form-container">
        <h2>Create Job Application</h2>
    <form onSubmit={handleCreate}>
      <label>
        User ID:
        <input type="text" value={userId} onChange={e => setUserId(e.target.value)} required />
      </label>
      <label>
        Company:
        <input type="text" value={company} onChange={e => setCompany(e.target.value)} required />
      </label>
      <label>
        Job Title:
        <input type="text" value={jobTitle} onChange={e => setJobTitle(e.target.value)} required />
      </label>
      <label>
        Application Date:
        <input type="date" value={applicationDate} onChange={e => setApplicationDate(e.target.value)} required />
      </label>
      <label>
      Application Status:
          <select value={applicationStatus} onChange={e => setApplicationStatus(e.target.value)} required>
            <option value="">Select...</option>
            {APPLICATION_STATUS_OPTIONS.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
            </select>
      </label>
      <label>
        Job Description:
        <textarea value={jobDescription} onChange={e => setJobDescription(e.target.value)} />
      </label>
      <label>
        Salary:
        <input type="number" value={salary} onChange={e => setSalary(e.target.value)} />
      </label>
      <label>
        Location:
        <input type="text" value={location} onChange={e => setLocation(e.target.value)} />
      </label>
      <label>
        Application Notes:
        <textarea value={applicationNotes} onChange={e => setApplicationNotes(e.target.value)} />
      </label>
      <button type="submit">Create</button>
    </form>
  </div>
  );
}

export default CreateJobApplication;