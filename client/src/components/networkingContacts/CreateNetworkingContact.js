import React, { useState } from 'react';
import axios from 'axios';

function CreateNetworkingContact({ currentUser }) {
    const [contactName, setContactName] = useState('');
    const [contactEmail, setContactEmail] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [position, setPosition] = useState('');
    const [contactNotes, setContactNotes] = useState('');

    const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3000'

    const handleSubmit = async (event) => {
        event.preventDefault();


        const contactData = {
            userId: currentUser.id,
            contactName,
            contactEmail,
            companyName,
            position,
            contactNotes
        };

        const resetForm = () => {
            setContactName('');
        };

        await axios.post(`${backendUrl}/networkingContacts`, contactData)
          .then(response => {
          // Handle successful create
          setIsSubmitted(true);
          setTimeout(resetForm, 1000); // Reset the form after 1 second
        })
        .catch(error => {
          console.error('Error creating networking contact', error);
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Contact Name:
                <input type="text" value={contactName} onChange={e => setContactName(e.target.value)} required />
                {errors.applicationDate && <div className="error">{errors.applicationDate}</div>}
            </label>
            <label>
                Contact Email:
                <input type="email" value={contactEmail} onChange={e => setContactEmail(e.target.value)} />
            </label>
            <label>
                Company Name:
                <input type="text" value={companyName} onChange={e => setCompanyName(e.target.value)} />
            </label>
            <label>
                Position:
                <input type="text" value={position} onChange={e => setPosition(e.target.value)} />
            </label>
            <label>
                Contact Notes:
                <textarea value={contactNotes} onChange={e => setContactNotes(e.target.value)} />
            </label>
            <button type="submit">Create</button>
        </form>
    );
}

export default CreateNetworkingContact;