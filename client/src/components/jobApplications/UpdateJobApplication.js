import React, { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import axios from 'axios';
import { APPLICATION_STATUS_OPTIONS } from '../constants';

// This component receives a job application as a prop and includes a form to update it.
function UpdateJobApplication({ jobApplication, backendUrl, show, onHide, setRefreshList }) {
  
  const [company, setCompany] = useState(jobApplication ? jobApplication.company : '');
  const [jobTitle, setJobTitle] = useState(jobApplication ? jobApplication.jobTitle : '');
  const [applicationDate, setApplicationDate] = useState(jobApplication ? jobApplication.applicationDate.toISOString().substring(0, 10) : '');
  const [applicationStatus, setApplicationStatus] = useState(jobApplication ? jobApplication.applicationStatus : '');
  const [jobDescription, setJobDescription] = useState(jobApplication ? jobApplication.jobDescription : '');
  const [salary, setSalary] = useState(jobApplication && jobApplication.salary ? jobApplication.salary.toString() : '');
  const [location, setLocation] = useState(jobApplication ? jobApplication.location : '');
  const [applicationNotes, setApplicationNotes] = useState(jobApplication ? jobApplication.applicationNotes : '');

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!jobApplication) {
    // Render nothing (or <div>a placeholder message</div>) until jobApplication is available
    return null;
  }

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

  const handleUpdate = async (event) => {
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
      company,
      jobTitle,
      applicationDate,
      applicationStatus,
      jobDescription,
      salary: salary !== '' ? Number(salary) : null,
      location,
      applicationNotes
    };

    await axios.put(`${backendUrl}/jobApplications/${jobApplication._id}`, jobApplicationData)
      .then(response => {
        console.log('Update successful:', response.data);
        setIsSubmitted(true);
        setTimeout(() => {
          resetForm();
          onHide(); // Close the modal after successful submission and form reset
          setRefreshList(prev => !prev); // Toggle the refreshList state to trigger a refresh
        }, 800);
      })
      .catch(error => {
        // Handle error
        console.error('Error updating job application:', error);
        setErrors({ submit: 'Error updating job application' });
      });
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Update Job Application</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Company</Form.Label>
            <Form.Control type="text" value={company} onChange={e => setCompany(e.target.value)} isInvalid={!!errors.company} required />
            <Form.Control.Feedback type="invalid">
              {errors.company}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Job Title</Form.Label>
            <Form.Control type="text" value={jobTitle} onChange={e => setJobTitle(e.target.value)} isInvalid={!!errors.jobTitle} required />
            <Form.Control.Feedback type="invalid">
              {errors.jobTitle}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Application Date</Form.Label>
            <Form.Control type="date" value={applicationDate} onChange={e => setApplicationDate(e.target.value)} isInvalid={!!errors.applicationDate} required />
            <Form.Control.Feedback type="invalid">
              {errors.applicationDate}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Application Status</Form.Label>
            <Form.Select value={applicationStatus} onChange={e => setApplicationStatus(e.target.value)} isInvalid={!!errors.applicationStatus} required>
              <option value="">Select...</option>
              {APPLICATION_STATUS_OPTIONS.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors.applicationStatus}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Job Description</Form.Label>
            <Form.Control as="textarea" value={jobDescription} onChange={e => setJobDescription(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Salary</Form.Label>
            <Form.Control type="number" value={salary} onChange={e => setSalary(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Location</Form.Label>
            <Form.Control type="text" value={location} onChange={e => setLocation(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Application Notes</Form.Label>
            <Form.Control as="textarea" value={applicationNotes} onChange={e => setApplicationNotes(e.target.value)} />
          </Form.Group>

          {isSubmitted && <Alert variant="success">Job application updated successfully!</Alert>}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Close</Button>
        <Button variant="primary" onClick={(event) => handleUpdate(event)}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default UpdateJobApplication;
