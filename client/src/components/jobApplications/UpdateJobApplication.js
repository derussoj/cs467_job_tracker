import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { APPLICATION_STATUS_OPTIONS } from '../constants';

// This component receives a job application as a prop and includes a form to update it.
function UpdateJobApplication({ jobApplication }) {
  const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3000'


  // Add state variables for each field in the job application
  const [company, setCompany] = useState(jobApplication.company);
  const [jobTitle, setJobTitle] = useState(jobApplication.jobTitle);
  const [applicationDate, setApplicationDate] = useState(jobApplication.applicationDate);
  const [applicationStatus, setApplicationStatus] = useState(jobApplication.applicationStatus);
  const [jobDescription, setJobDescription] = useState(jobApplication.jobDescription);
  const [salary, setSalary] = useState(jobApplication.salary);
  const [location, setLocation] = useState(jobApplication.location);
  const [applicationNotes, setApplicationNotes] = useState(jobApplication.applicationNotes);

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const resetForm = () => {
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

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newErrors = {};

    // Validate the form data
    if (!company) newErrors.company = 'Company is required.';
    if (!jobTitle) newErrors.jobTitle = 'Job title is required.';
    if (!applicationDate) newErrors.applicationDate = 'Application date is required.';
    if (!applicationStatus) newErrors.applicationStatus = 'Application status is required.';

    if (Object.keys(newErrors).length > 0) {
    // If there are errors, update the errors state and stop the form submission
    setErrors(newErrors);
    return;
    };

    const jobApplicationData = {
        applicationId: jobApplication._id,
        company,
        jobTitle,
        applicationDate,
        applicationStatus,
        jobDescription,
        salary,
        location,
        applicationNotes
    };

    await axios.put(`${backendUrl}/jobApplications/${match.params.id}`, jobApplicationData)
      .then(response => {
          console.log('Update successful:', response.data);
          setIsSubmitted(true);
          setTimeout(resetForm, 1000); // Reset the form after 1 second
      })
      .catch(error => {
          // Handle error
          console.error('Error updating job application:', error);
          setErrors({ submit: 'Error updating job application' });
      });
  };

  return (
    <div className="form-container">
    <h2>Update Job Application</h2>
      <form onSubmit={handleSubmit}>
          <label>
            Company:
            <input type="text" value={company} onChange={e => setCompany(e.target.value)} required />
            {errors.company && <div className="error">{errors.company}</div>}
          </label>
          <label>
            Job Title:
            <input type="text" value={jobTitle} onChange={e => setJobTitle(e.target.value)} required />
            {errors.jobTitle && <div className="error">{errors.jobTitle}</div>}
          </label>
          <label>
            Application Date:
            <input type="date" value={applicationDate} onChange={e => setApplicationDate(e.target.value)} required />
            {errors.applicationDate && <div className="error">{errors.applicationDate}</div>}
          </label>
          <label>
            Application Status:
            <select value={applicationStatus} onChange={e => setApplicationStatus(e.target.value)} required>
              <option value="">Select...</option>
              {APPLICATION_STATUS_OPTIONS.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            {errors.applicationStatus && <div className="error">{errors.applicationStatus}</div>}
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
          {isSubmitted && <div className="success">Job application updated successfully!</div>}
      </form>
    </div>
  );
}

export default UpdateJobApplication;