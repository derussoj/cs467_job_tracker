import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SkillsList({ backendUrl, currentUser }) {
    const [skills, setSkills] = useState([]);

    useEffect(() => {
        if (currentUser !== null) {
            const fetchSkills = async () => {
                const response = await axios.get(`${backendUrl}/skills/${currentUser.id}`);
                setSkills(response.data);
            };
            fetchSkills();
        }
    }, [currentUser, backendUrl]);

    return (
        <ul>
            {skills.map(skill => (
                <li key={skill._id}>{skill.skillName}</li>
            ))}
        </ul>
    );
}

export default SkillsList;
