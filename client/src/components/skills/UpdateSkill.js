import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UpdateSkill({ match }) {
    const [skillName, setSkillName] = useState('');

    const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3000'

    useEffect(() => {
        const fetchSkill = async () => {
          const response = await axios.get(`${backendUrl}/skills/${match.params.id}`);
          const skill = response.data;
          setSkillName(skill.skillName);
        };
        fetchSkill();
    }, [match.params.id, backendUrl]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const skillData = {
          skillName
        };

        const newErrors = {};

        // Validate the form data
        if (!skillName) newErrors.skillName = 'Skill Name is required.';

        if (Object.keys(newErrors).length > 0) {
          // If there are errors, update the errors state and stop the form submission
          setErrors(newErrors);
          return;
        }

        await axios.put(`${backendUrl}/skills/${match.params.id}`, skillData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Skill Name:
                <input type="text" value={skillName} onChange={e => setSkillName(e.target.value)} required />
            </label>
            <button type="submit">Update</button>
        </form>
    );
}

export default UpdateSkill;