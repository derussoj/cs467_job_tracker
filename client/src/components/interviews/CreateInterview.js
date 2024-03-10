import React, { useState } from 'react';
import axios from 'axios';

function CreateInterview({ currentUser }) {
    const [applicationId, setApplicationId] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [interviewDateTime, setInterviewDateTime] = useState('');
    const [interviewLocation, setInterviewLocation] = useState('');
    const [networkingContactIds, setNetworkingContactIds] = useState([]);
    const [interviewNotes, setInterviewNotes] = useState('');

    const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3000'

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

        await axios.post(`${backendUrl}/interviews`, interviewData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Application ID:
                <input type="text" value={applicationId} onChange={e => setApplicationId(e.target.value)} required />
            </label>
            <label>
                Company Name:
                <input type="text" value={companyName} onChange={e => setCompanyName(e.target.value)} required />
            </label>
            <label>
                Interview Date and Time:
                <input type="datetime-local" value={interviewDateTime} onChange={e => setInterviewDateTime(e.target.value)} />
            </label>
            <label>
                Interview Location:
                <input type="text" value={interviewLocation} onChange={e => setInterviewLocation(e.target.value)} />
            </label>
            <label>
                Networking Contact IDs:
                <input type="text" value={networkingContactIds} onChange={e => setNetworkingContactIds(e.target.value.split(','))} />
            </label>
            <label>
                Interview Notes:
                <textarea value={interviewNotes} onChange={e => setInterviewNotes(e.target.value)} />
            </label>
            <button type="submit">Create</button>
        </form>
    );
}

export default CreateInterview;