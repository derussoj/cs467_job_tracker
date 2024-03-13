import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import axios from 'axios';

function UpdateSkill({ skill, index, backendUrl, currentUser, setSkills, show, onHide, setRefreshList }) {
  const [skillName, setSkillName] = useState(skill ? skill : '');

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const resetForm = () => {
    setSkillName('');
    setErrors({});
    setIsSubmitted(false);
  }

  useEffect(() => {
    if (skill) {
      setSkillName(skill);
    } else {
      resetForm();
    }
  }, [skill]);

  if (!skill) {
    // Render nothing (or <div>a placeholder message</div>) until skill is available
    return null;
  }

  const handleUpdate = async (event) => {
    event.preventDefault();

    const newErrors = {};

    // Validate the form data
    if (!skillName) newErrors.skillName = 'A skill name is required.';

    if (Object.keys(newErrors).length > 0) {
      // If there are errors, update the errors state and stop the form submission
      setErrors(newErrors);
      return;
    }

    if (index !== -1) {
      // Replace the old skill with the updated skill
      const updatedSkills = [...currentUser.skills];
      updatedSkills[index] = skillName;

      // Optimistically update the skills in the parent component state
      setSkills(updatedSkills);

      // Prepare the updated user object for the API call
      const updatedUser = {
        ...currentUser,
        skills: updatedSkills
      };

      // Make an API call to update the user's skills on the server
      axios.put(`${backendUrl}/users/${currentUser.id}`, updatedUser)
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
          console.error('Error updating skill:', error);
          setErrors({ submit: 'Error updating skill' });
          // Roll back to the original skills state in case of an error
          setSkills(currentUser.skills);
          // TODO: alert modal?
        });
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Update Skill</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Skill</Form.Label>
            <Form.Control type="text" value={skillName} onChange={e => setSkillName(e.target.value)} isInvalid={!!errors.skillName} required />
            <Form.Control.Feedback type="invalid">
              {errors.skillName}
            </Form.Control.Feedback>
          </Form.Group>

          {isSubmitted && <Alert variant="success">Skill updated successfully!</Alert>}
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

export default UpdateSkill;
