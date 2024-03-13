import React, { useState, useEffect } from 'react';
import { ListGroup, Button } from 'react-bootstrap';
import axios from 'axios';
import UpdateSkill from './UpdateSkill';
import ConfirmModal from '../ui/ConfirmModal';

function SkillsList({ backendUrl, currentUser, setCurrentUser, refreshList, setRefreshList }) {
    const [skills, setSkills] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [selectedSkill, setSelectedSkill] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(null);

    useEffect(() => {
        if (currentUser !== null) {
            setLoading(true);
            fetch(`${backendUrl}/api/currentUser`, {
                credentials: 'include' // Required for cookies to be sent with the request
            })
                .then(response => response.json())
                .then(data => {
                    if (data.isLoggedIn) {
                        setCurrentUser(data.user); // Update the currentUser in global state
                        setSkills(data.user.skills); // Save the user's info in state
                    } else {
                        setCurrentUser(null);
                        setSkills([]);
                    }
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Error fetching user data:', error);
                    setLoading(false);
                });
        }
    }, [backendUrl, currentUser, setCurrentUser, refreshList]);

    const handleUpdateStart = (skill, index) => {
        setSelectedSkill(skill);
        setSelectedIndex(index);
        setShowUpdateModal(true);
    };

    const handleUpdateEnd = () => {
        setShowUpdateModal(false);
        setSelectedSkill(null);
        setSelectedIndex(null);
    };

    // Open the confirmation modal and store the skill ID to be deleted
    const confirmDelete = (skill) => {
        setSelectedSkill(skill);
        setShowConfirmModal(true);
    };

    // Handle the "Confirm" action
    const handleDelete = async () => {
        if (selectedSkill) {

            // Create a shallow copy of the current skills state in case of rollback
            const currentSkills = [...skills];

            // Update the skills array by filtering out the selected skill
            // and update local state for immediate UI response
            const updatedSkills = skills.filter(skill => skill !== selectedSkill);
            setSkills(updatedSkills);

            // Hide the confirmation modal (and refresh the list?)
            setShowConfirmModal(false);
            // setRefreshList(prev => !prev);

            // Prepare the updated user object for the API call
            const updatedUser = {
                ...currentUser,
                skills: updatedSkills
            };

            // API call to update the user on the server
            try {
                await axios.put(`${backendUrl}/users/${currentUser.id}`, updatedUser);
                console.log('Skill deleted successfully');
                setCurrentUser(updatedUser); // Update the currentUser in global state
            } catch (error) {
                console.error('Error updating user skills:', error);
                // Roll back to the original skills state in case of an error
                setSkills(currentSkills);
                // TODO: alert modal?
            }
        }
    };

    // Handle the "Cancel" action
    const handleDeleteCancel = () => {
        setShowConfirmModal(false);
        setSelectedSkill(null);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <ListGroup>
                {skills.map((skill, index) => (
                    <ListGroup.Item key={index} className="d-flex justify-content-between align-items-start">
                        <div>
                            {skill}
                        </div>
                        <div>
                            <Button variant="outline-primary" size="sm" onClick={() => handleUpdateStart(skill, index)}>Edit</Button>{' '}
                            <Button variant="outline-danger" size="sm" onClick={() => confirmDelete(skill)}>Delete</Button>
                        </div>
                    </ListGroup.Item>
                ))}
            </ListGroup>

            <UpdateSkill
                skill={selectedSkill}
                index={selectedIndex}
                backendUrl={backendUrl}
                currentUser={currentUser}
                setSkills={setSkills}
                show={showUpdateModal}
                onHide={handleUpdateEnd}
                setRefreshList={setRefreshList}
            />

            <ConfirmModal
                show={showConfirmModal}
                message="Are you sure you want to delete this skill?"
                onConfirm={handleDelete}
                onCancel={handleDeleteCancel}
            />
        </>
    );
}

export default SkillsList;
