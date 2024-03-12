import React, { useState } from 'react';
import axios from 'axios';

function UpdateInterview({ backendUrl, currentUser, interview }) {
    const [applicationId, setApplicationId] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [interviewDateTime, setInterviewDateTime] = useState('');
    const [interviewLocation, setInterviewLocation] = useState('');
    const [networkingContactIds, setNetworkingContactIds] = useState([]);
    const [interviewNotes, setInterviewNotes] = useState('');

    const resetForm = () => {
        setApplicationId('');
        setCompanyName('');
        setInterviewDateTime('');
        setInterviewLocation('');
        setNetworkingContactIds([]);
        setInterviewNotes('');
    }

    // useEffect(() => {
    //     const fetchInterview = async () => {
    //         const response = await axios.get(`${backendUrl}/interviews/${interview._id}`);
    //         const interview = response.data;
    //         setApplicationId(interview.applicationId);
    //         setCompanyName(interview.companyName);
    //         setInterviewDateTime(interview.interviewDateTime);
    //         setInterviewLocation(interview.interviewLocation);
    //         setNetworkingContactIds(interview.networkingContactIds);
    //         setInterviewNotes(interview.interviewNotes);
    //     };
    //     fetchInterview();
    // }, [interview._id, backendUrl]);

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

        await axios.put(`${backendUrl}/interviews/${interview._id}`, interviewData)
          .then(response => {
            console.log('Update successful:', response.data);
            setTimeout(resetForm, 1000); // Reset the form after 1 second
          })
          .catch(error => {
              // Handle error
              console.error('Error updating interview:', error);
              // setErrors({ submit: 'Error updating interview' });
          });
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
            <button type="submit">Update</button>
        </form>
    );
}

export default UpdateInterview;