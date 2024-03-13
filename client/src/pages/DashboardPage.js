import React, { useState } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import JobApplicationsList from '../components/jobApplications/JobApplicationsList';
import InterviewsList from '../components/interviews/InterviewsList';
import NetworkingContactsList from '../components/networkingContacts/NetworkingContactList';
import SkillsList from '../components/skills/SkillList';
import FloatingActionButton from '../components/ui/FloatingActionButton';
import CreateJobApplication from '../components/jobApplications/CreateJobApplication';
import CreateInterview from '../components/interviews/CreateInterview';
import CreateNetworkingContact from '../components/networkingContacts/CreateNetworkingContact';
import CreateSkill from '../components/skills/CreateSkill';

function DashboardPage({ backendUrl, currentUser, setCurrentUser }) {
    const [key, setKey] = useState('jobApplications');
    const [showModal, setShowModal] = useState({ jobApplications: false, interviews: false, networkingContacts: false, skills: false });
    const [refreshJobApplicationsList, setRefreshJobApplicationsList] = useState(false);
    const [refreshInterviewsList, setRefreshInterviewsList] = useState(false);
    const [refreshNetworkingContactsList, setRefreshNetworkingContactsList] = useState(false);
    const [refreshSkillsList, setRefreshSkillsList] = useState(false);

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
                    <JobApplicationsList
                        backendUrl={backendUrl}
                        currentUser={currentUser}
                        refreshList={refreshJobApplicationsList}
                        setRefreshList={setRefreshJobApplicationsList}
                    />
                </Tab>
                <Tab eventKey="interviews" title="Interviews">
                    <InterviewsList
                        backendUrl={backendUrl}
                        currentUser={currentUser}
                        refreshList={refreshInterviewsList}
                        setRefreshList={setRefreshInterviewsList}
                    />
                </Tab>
                <Tab eventKey="networkingContacts" title="Contacts">
                    <NetworkingContactsList
                        backendUrl={backendUrl}
                        currentUser={currentUser}
                        refreshList={refreshNetworkingContactsList}
                        setRefreshList={setRefreshNetworkingContactsList}
                    />
                </Tab>
                <Tab eventKey="skills" title="Skills">
                    <SkillsList
                        backendUrl={backendUrl}
                        currentUser={currentUser}
                        setCurrentUser={setCurrentUser}
                        refreshList={refreshSkillsList}
                        setRefreshList={setRefreshSkillsList}
                    />
                </Tab>
            </Tabs>

            <FloatingActionButton onClick={() => handleShowModal(key)} />

            <CreateJobApplication
                backendUrl={backendUrl}
                currentUser={currentUser}
                show={showModal.jobApplications}
                onHide={() => handleCloseModal('jobApplications')}
                setRefreshList={setRefreshJobApplicationsList}
            />
            <CreateInterview
                backendUrl={backendUrl}
                currentUser={currentUser}
                show={showModal.interviews}
                onHide={() => handleCloseModal('interviews')}
                setRefreshList={setRefreshInterviewsList}
            />
            <CreateNetworkingContact
                backendUrl={backendUrl}
                currentUser={currentUser}
                show={showModal.networkingContacts}
                onHide={() => handleCloseModal('networkingContacts')}
                setRefreshList={setRefreshNetworkingContactsList}
            />
            <CreateSkill
                backendUrl={backendUrl}
                currentUser={currentUser}
                show={showModal.skills}
                onHide={() => handleCloseModal('skills')}
                setRefreshList={setRefreshSkillsList}
            />
        </>
    );
}

export default DashboardPage;
