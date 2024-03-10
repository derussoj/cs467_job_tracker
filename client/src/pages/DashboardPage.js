import React, { useState } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import JobApplicationsList from '../components/jobApplications/JobApplicationsList';
import CreateJobApplication from '../components/jobApplications/CreateJobApplication';
import InterviewsList from '../components/interviews/InterviewsList';
import FloatingActionButton from '../components/ui/FloatingActionButton';

function DashboardPage({ backendUrl, currentUser }) {
    const [key, setKey] = useState('jobApplications');
    const [showModal, setShowModal] = useState({ jobApplications: false, interviews: false });

    // Show and hide modals based on current Tab
    const handleShowModal = (key) => setShowModal({ ...showModal, [key]: true });
    const handleCloseModal = (key) => setShowModal({ ...showModal, [key]: false });

    return (
        <>
            <Tabs
                id="dashboard-tabs"
                activeKey={key}
                onSelect={(k) => setKey(k)}
                className="mb-3"
            >
                <Tab eventKey="jobApplications" title="Job Applications">
                    <JobApplicationsList backendUrl={backendUrl} currentUser={currentUser} />
                </Tab>
                <Tab eventKey="interviews" title="Interviews">
                    <InterviewsList backendUrl={backendUrl} currentUser={currentUser} />
                </Tab>
                {/* Other tabs */}
            </Tabs>

            <FloatingActionButton onClick={() => handleShowModal(key)} />

            <CreateJobApplication
                backendUrl={backendUrl}
                currentUser={currentUser}
                show={showModal.jobApplications}
                onHide={() => handleCloseModal('jobApplications')}
            />

        </>
    );
}

export default DashboardPage;
