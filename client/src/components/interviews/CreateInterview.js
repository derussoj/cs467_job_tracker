import React, { useState } from 'react';
import { Modal, Button, Form, FormGroup, FormControl, FormLabel } from 'react-bootstrap';

// This component includes a form to create a new interview.
function CreateInterview({ backendUrl, currentUser, show, onHide, setRefreshList }) {
    const [applicationId, setApplicationId] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [interviewDateTime, setInterviewDateTime] = useState('');
    const [interviewLocation, setInterviewLocation] = useState('');
    const [networkingContactIds, setNetworkingContactIds] = useState([]);
    const [interviewNotes, setInterviewNotes] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        const interviewData = {
            userId: currentUser.id,
            applicationId,
            companyName,
            interviewDateTime,
            interviewLocation,
            networkingContactIds,
            interviewNotes
        };

        // Send a POST request to create a new interview
        fetch(`${backendUrl}/interviews`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ interviewData }),
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
                // setIsSubmitted(true);
                setTimeout(() => {
                    // resetForm();
                    onHide(); // Close the modal after successful submission and form reset
                    setRefreshList(prev => !prev); // Toggle the refreshList state to trigger a refresh
                }, 800);
            })
            .catch(error => {
                console.error('Error creating interview:', error);
            });
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Create Interview</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={(event) => handleSubmit(event)}>
                    <FormGroup className="mb-3">
                        <FormLabel>Application ID:</FormLabel>
                        <FormControl type="text" value={applicationId} onChange={e => setApplicationId(e.target.value)} required />
                        {/* Include error display if applicable */}
                    </FormGroup>

                    <FormGroup className="mb-3">
                        <FormLabel>Company Name:</FormLabel>
                        <FormControl type="text" value={companyName} onChange={e => setCompanyName(e.target.value)} required />
                        {/* Include error display if applicable */}
                    </FormGroup>

                    <FormGroup className="mb-3">
                        <FormLabel>Interview Date and Time:</FormLabel>
                        <FormControl type="datetime-local" value={interviewDateTime} onChange={e => setInterviewDateTime(e.target.value)} />
                        {/* Include error display if applicable */}
                    </FormGroup>

                    <FormGroup className="mb-3">
                        <FormLabel>Interview Location:</FormLabel>
                        <FormControl type="text" value={interviewLocation} onChange={e => setInterviewLocation(e.target.value)} />
                        {/* Include error display if applicable */}
                    </FormGroup>

                    <FormGroup className="mb-3">
                        <FormLabel>Networking Contact IDs:</FormLabel>
                        <FormControl type="text" value={networkingContactIds.join(',')} onChange={e => setNetworkingContactIds(e.target.value.split(','))} />
                        {/* Explain format or provide UI for better input handling */}
                    </FormGroup>

                    <FormGroup className="mb-3">
                        <FormLabel>Interview Notes:</FormLabel>
                        <FormControl as="textarea" value={interviewNotes} onChange={e => setInterviewNotes(e.target.value)} />
                        {/* Include error display if applicable */}
                    </FormGroup>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>Close</Button>
                <Button variant="primary" onClick={(event) => handleSubmit(event)}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default CreateInterview;
