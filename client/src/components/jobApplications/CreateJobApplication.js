
import React, { useState } from 'react';
import { Modal, Button, Form, FormGroup, FormControl, FormLabel } from 'react-bootstrap';
import { APPLICATION_STATUS_OPTIONS } from '../constants';

// This component includes a form to create a new job application.
function CreateJobApplication({ backendUrl, currentUser, show, onHide, setRefreshList }) {
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
    fetch(`${backendUrl}/jobApplications`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId: currentUser.id,
        company,
        jobTitle,
        applicationDate,
        applicationStatus,
        jobDescription,
        salary,
        location,
        applicationNotes
      }),
      credentials: 'include' // To include cookies in the request
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // Handle successful create
        setIsSubmitted(true);
        setTimeout(() => {
          resetForm();
          onHide(); // Close the modal after successful submission and form reset
          setRefreshList(prev => !prev); // Toggle the refreshList state to trigger a refresh
        }, 800);
      })
      .catch(error => {
        console.error('Error creating job application:', error);
      });
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Create Job Application</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleCreate}>
          <FormGroup className="mb-3">
            <FormLabel>Company:</FormLabel>
            <FormControl type="text" value={company} onChange={e => setCompany(e.target.value)} required />
            {errors.company && <div className="error">{errors.company}</div>}
          </FormGroup>

          <FormGroup className="mb-3">
            <FormLabel>Job Title:</FormLabel>
            <FormControl type="text" value={jobTitle} onChange={e => setJobTitle(e.target.value)} required />
            {errors.jobTitle && <div className="error">{errors.jobTitle}</div>}
          </FormGroup>

          <FormGroup className="mb-3">
            <FormLabel>Application Date:</FormLabel>
            <FormControl type="date" value={applicationDate} onChange={e => setApplicationDate(e.target.value)} required />
            {errors.applicationDate && <div className="error">{errors.applicationDate}</div>}
          </FormGroup>

          <FormGroup className="mb-3">
            <FormLabel>Application Status:</FormLabel>
            <FormControl as="select" value={applicationStatus} onChange={e => setApplicationStatus(e.target.value)} required>
              <option value="">Select...</option>
              {APPLICATION_STATUS_OPTIONS.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </FormControl>
            {errors.applicationStatus && <div className="error">{errors.applicationStatus}</div>}
          </FormGroup>

          <FormGroup className="mb-3">
            <FormLabel>Job Description:</FormLabel>
            <FormControl as="textarea" value={jobDescription} onChange={e => setJobDescription(e.target.value)} />
          </FormGroup>

          <FormGroup className="mb-3">
            <FormLabel>Salary:</FormLabel>
            <FormControl type="number" value={salary} onChange={e => setSalary(e.target.value)} />
          </FormGroup>

          <FormGroup className="mb-3">
            <FormLabel>Location:</FormLabel>
            <FormControl type="text" value={location} onChange={e => setLocation(e.target.value)} />
          </FormGroup>

          <FormGroup className="mb-3">
            <FormLabel>Application Notes:</FormLabel>
            <FormControl as="textarea" value={applicationNotes} onChange={e => setApplicationNotes(e.target.value)} />
          </FormGroup>

          {isSubmitted && <div className="success">Job application created successfully!</div>}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Close</Button>
        <Button variant="primary" onClick={(event) => handleCreate(event)}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CreateJobApplication;
