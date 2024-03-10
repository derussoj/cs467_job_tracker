import React, { useState } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import JobApplicationsList from '../components/jobApplications/JobApplicationsList';
import InterviewsList from '../components/interviews/InterviewsList';
import FloatingActionButton from '../components/ui/FloatingActionButton';

function DashboardPage({ backendUrl, currentUser }) {
    const [key, setKey] = useState('jobApplications');

    // Function to handle the "Create" action
    const handleCreateNew = () => {
        // Logic to open a form for creating a new object
        // use 'key' to determine which object to create
    };

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
            <FloatingActionButton onClick={handleCreateNew} />
        </>
    );
}

export default DashboardPage;
