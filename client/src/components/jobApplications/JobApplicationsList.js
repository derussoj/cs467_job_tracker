import React, { useState, useEffect } from 'react';
import { ListGroup, Button } from 'react-bootstrap';
import axios from 'axios';
import UpdateJobApplication from '../jobApplications/UpdateJobApplication';
import ConfirmModal from '../ui/ConfirmModal';

// This component fetches and displays a list of job applications.
function JobApplicationsList({ backendUrl, currentUser, refreshList, setRefreshList }) {
  const [jobApplications, setJobApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedJobApplication, setSelectedJobApplication] = useState(null);

  useEffect(() => {
    if (currentUser !== null) {
      setLoading(true);
      axios.get(`${backendUrl}/jobApplications/user/${currentUser.id}`)
        .then(response => {
          setJobApplications(response.data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
          setLoading(false);
        });
    }
  }, [backendUrl, currentUser, refreshList]);

  const handleUpdateStart = (jobApplication) => {
    setSelectedJobApplication(jobApplication);
    setShowUpdateModal(true);
  };

  const handleUpdateEnd = () => {
    setShowUpdateModal(false);
    setSelectedJobApplication(null);
  };

  // Open the confirmation modal and store the job application ID to be deleted
  const confirmDelete = (jobApplication) => {
    setSelectedJobApplication(jobApplication);
    setShowConfirmModal(true);
  };

  // Handle the "Confirm" action
  const handleDelete = () => {
    if (selectedJobApplication._id) {
      // Perform the delete operation
      axios.delete(`${backendUrl}/jobApplications/${selectedJobApplication._id}`)
        .then(() => {
          // After deletion, hide the confirmation modal and refresh the list
          setShowConfirmModal(false);
          setRefreshList(prev => !prev);
        })
        .catch(error => {
          console.error('Error deleting job application:', error);
        });
    }
  };

  // Handle the "Cancel" action
  const handleDeleteCancel = () => {
    setShowConfirmModal(false);
    setSelectedJobApplication(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <ListGroup>
        {jobApplications.map(jobApplication => (
          <ListGroup.Item key={jobApplication._id} className="d-flex justify-content-between align-items-start">
            <div>
              <h5>{jobApplication.jobTitle} at {jobApplication.company}</h5>
              <p>Date: {jobApplication.applicationDate}</p>
              <p>Status: {jobApplication.applicationStatus}</p>
            </div>
            <div>
              <Button variant="outline-primary" size="sm" onClick={() => handleUpdateStart(jobApplication)}>Edit</Button>{' '}
              <Button variant="outline-danger" size="sm" onClick={() => confirmDelete(jobApplication)}>Delete</Button>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>

      <UpdateJobApplication
        jobApplication={selectedJobApplication}
        backendUrl={backendUrl}
        show={showUpdateModal}
        onHide={handleUpdateEnd}
        setRefreshList={setRefreshList}
      />

      <ConfirmModal
        show={showConfirmModal}
        message="Are you sure you want to delete this job application?"
        onConfirm={handleDelete}
        onCancel={handleDeleteCancel}
      />
    </>
  );
}

export default JobApplicationsList;
