import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SkillsList({ currentUser }) {
    const [skills, setSkills] = useState([]);

    const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3000'

    useEffect(() => {
        const fetchSkills = async () => {
            const response = await axios.get(`${backendUrl}/skills/user/${currentUser.id}`);
            setSkills(response.data);
        };
        fetchSkills();
    }, [currentUser.id, backendUrl]);

    return (
        <ul>
            {skills.map(skill => (
                <li key={skill._id}>{skill.skillName}</li>
            ))}
        </ul>
    );
}

export default SkillsList;
